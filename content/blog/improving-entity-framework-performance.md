---
path: improving-entity-framework-performance
date: 2015-10-26T00:00:00.000Z
title: Improving Entity Framework performance
description: >-
  Tips on how to improve the performance of Entity Framework 6.x and access to
  SQL generally.
---

This post gives some tips on how to **improve the performance of your applications running Entity Framework** (EF6 era), and access to SQL generally.

EF has been the primary ORM I've worked with since 2011. Over the last year I've needed to optimize a very data access intensive project (synchronising complex data from one system to another during peak periods) that used EF. I profiled, measured, tested, and then did it all again... Based on this experience and other research, here are some thoughts on getting the best from EF.

![Speed of Light image](images/speed-of-light-640x427.jpg)

[Speed of Light](https://www.flickr.com/photos/91369701@N00/473868198/)

## Keep context open only for as long as necessary

Long running contexts are a performance killer. EF already caches anything that can be reused when it starts up the first time. There is nothing you are saving here except a few lines of code, and it's not worth it - you can find yourself with slow performance, memory and locking problems!

Also watch for code that runs while your context is open but is not needed by any queries. Let's not keep that transaction running for any longer than it needs to be...

<script src="https://gist.github.com/alexangas/39992b4fc703c1b5847a.js"></script>

One way to encourage/enforce this is by implementing a "query object" pattern as [described by Jimmy Bogard](https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/). This has a lot of great advantages - the main one being easier maintenance (via the [Single Responsiblity Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)).

<script src="https://gist.github.com/alexangas/0282f53a248df6831f22.js"></script>

Finally, this is hopefully obvious but external resources (like databases) that are no longer needed can leak memory. Let EF know you're done with it by wrapping your database calls with the `using` pattern.

<script src="https://gist.github.com/alexangas/13bd5d8b80120cbf6df4.js"></script>

## Optimize read-only queries

Design your data read algorithms to minimise database access. If you need to refer to the same set of data using queries that differ in minor ways, consider loading the entire set into memory first. Then query the set in memory. It may also be useful to cache the data set.

If you don't need change tracking (i.e. to perform writes), add [`.AsNoTracking()`](https://msdn.microsoft.com/en-us/library/system.data.entity.dbextensions.asnotracking.aspx) to your query to ensure it will not be loaded into the context. The context attachment takes some time, and so does a call to `.SaveChanges()` if you have a couple of queries - one that requires changes and one that does not. This is exacerbated if there are a lot of results from those queries.

<script src="https://gist.github.com/alexangas/ce9aa49ff5227b3bb7ed.js"></script>

## Avoid loading full objects

Continuing with the read-only theme, if you only need a couple of values from each row then just `Select()` what you need. This instructs EF to only request those columns from SQL, therefore avoiding loading the full object as well as context tracking.

<script src="https://gist.github.com/alexangas/7d4d0810b23e07ede8ba.js"></script>

If you just need to check the existence of something and don't need to load it from the database, then... errr... don't. :-) Instead, use [`.Any()`](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.any.aspx) to check if a data row contains a particular value.

## Consider disabling eager and/or lazy loading

Yes here I am recommending you to turn off some of the key features of Entity Framework. They are wonderful, but aren't always appropriate when you need full control over what gets loaded from the database and when.

Eager loading often pulls in too much at once, which apart from additional data access, also means additional work for EF to manage those objects during the lifetime of the context. However if your object makes no sense unless those relationships are loaded in, then eager loading could still be for you.

Lazy loading can fire off additional access to the database when you materialise your query. This can be avoided with lazy loading off by simply loading those objects in explicitly as part of that original query with `.Include()`.

More details on how to configure and use (or not) these two features can be found in [Loading Related Entities](https://msdn.microsoft.com/en-us/data/jj574232.aspx).

## Be careful using IQueryable

Returning an EF query as `IQueryable<T>` from a method is handy because it lets you build on the query later. However this can also bite when queries stack up and their (often unnecessary) complexity is hidden. Then there is the effect of looping through an `IQueryable`, which can cause EF to execute a separate query hit to SQL Server for each iteration.

Instead centralise your query to a single method and use `ToList()` to return exactly what you need.

## Speed up bulk adds

If you are simply adding a number of objects then saving them, you may not be aware that EF will check whether each of those new objects has changed. To avoid this, turn off [`AutoDetectChangesEnabled`](https://msdn.microsoft.com/en-us/data/jj556205.aspx) before adding, then back on again afterwards. It does exactly what its name suggests.

<script src="https://gist.github.com/alexangas/544627634d31a161377a.js"></script>

There is also a community contribution that provides support for SQL bulk inserts using [`SqlBulkCopy`](https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlbulkcopy.aspx) called [EntityFramework.BulkInsert](https://www.nuget.org/packages/EntityFramework.BulkInsert-ef6/). This works really well but be aware that the version at time of writing (6.0.2.8) is not thread safe so you will need to wrap the call to `BulkInsert()` in a `lock` statement.

## Speed up bulk deletes

There didn't used to be a convenience method for deleting a collection of objects from the database at once. The only way was a loop and calls to [`Remove()`](https://msdn.microsoft.com/en-us/library/bb337024%28v=vs.110%29.aspx), which you guessed it, hit the database on every iteration. Then [`RemoveRange()`](https://msdn.microsoft.com/en-us/library/system.data.entity.dbset.removerange%28v=vs.113%29.aspx) was added which slightly improved things by [wrapping the loop with `AutoDetectChangedEnabled` set to false](http://stackoverflow.com/a/23787902/6651), however the database is still hit on every iteration!

The only way to solve this is to issue a good ol' parameterised SQL query yourself. You can run this [through EF](https://msdn.microsoft.com/en-us/library/system.data.entity.database.executesqlcommand.aspx) so it is wrapped in a transaction. Keep in mind that you are bypassing any tracking EF may be doing of these objects (directly or as relationships).

<script src="https://gist.github.com/alexangas/69d0113cfea0167e3d01.js"></script>

## Make the most of available tooling

When trying to extract performance out of any application of reasonable complexity, good tooling is necessary. Here's some recommendations.

### Query generation

Use [LINQPad](http://www.linqpad.net/entityframework.aspx) for any medium to advanced queries. It's worth writing them here first. You can see the various types of syntax (including SQL) that will be generated and it is super powerful!

### SQL profiling

Entity Framework can seem like a black box at times. For slow queries you may like to run SQL Profiler (or alternative) to see exactly how your LINQ query has been transformed to SQL. Or maybe what you thought would amount to a single SELECT has multiplied into thousands. This is the only way you will know.

Also use SQL Profiler to [create and verify database indexes against EF queries](http://alexangas.com/sql-server-index-tuning-flavoured-with-entity-framework-and-wcf-data-services/). Indexes can make a significant difference to your database queries.

### Code profiling

It's easy, particularly in complex data access code, to miss hot paths or loops that you didn't intend to introduce. For my most recent project I used [Telerik JustTrace](http://www.telerik.com/products/memory-performance-profiler.aspx) and [DotTrace](https://www.jetbrains.com/profiler/) which both worked well. [ANTS Performance Profiler](http://www.red-gate.com/products/dotnet-development/ants-performance-profiler/) is also good.

### Entity Framework itself

Every major release of EF contains performance improvements. Unless you have issues with dependencies on other libraries (e.g. the deprecated WCF Data Services requires EF5) it should be fairly simple and quick to update to the latest version of EF. For critical production systems, factor in some testing time just in case.

## Finally

You can find more invaluable information on this topic from Microsoft at [Performance considerations for Entity Framework 4, 5, and 6](https://msdn.microsoft.com/en-us/data/hh949853.aspx).
