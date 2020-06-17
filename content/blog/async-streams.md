---
path: adding-cypress-to-azure-static-web-apps-pull-request-staging-pipeline
date: 2020-06-17T17:15:38Z
title: Updating legacy code to use C# async streams
description: >-
  I once wrote a podcast feed reader library. Now it's time to make that code readable.
tags: ["csharp", "async", "streams"]
---

Several years ago I wrote a **podcast feed reader** as a C# class library for a podcast app I was working on at the time.
It needed to fit the following goals:

1. **Resilience to data sources with varying degrees of validity.**
While podcasting has matured a great deal as a medium, anyone can produce a podcast feed on a mixture of platforms.
I wanted a platform of openness, and one that did not require strict correctness.

1. **Flexibility that allows for performance optimisations.**
Some podcast feeds have 100s if not 1000s of episodes.
Then each episode itself can contain a large amount of content.
If as a feed consumer I only want details about the show or certain episodes, then it would be a waste of network bandwidth and computing resources to download the entire feed.

1. **Resilience to network failures.**
Similar to the previous point, the feeds themselves (and their audio content) may not live on a reliable hosting provider.
Besides, it's just good practice to be prepared for this scenario and ensure the code can handle it.

1. **Contextual error reporting.**
If there is a problem reading the feed, I wanted to be able to record this with relevant details.
It may mean improvements that can be made to that data source resilience mentioned earlier,
or perhaps this feed consistently has so many errors we no longer wish to try reading from it.

1. **Be great at doing just these things.**
It may be tempting to additional smarts into the logic, however this needs to be left to the consumer of this library. 
We want to give them the flexibility to do this but not weigh down this library with any of it.

That last point is an additional goal since that original library was written, where it started becoming tightly coupled and a little out of control.
There were good reasons for this, mainly around performance, but (no surprises!) it made the library too difficult to maintain.
So then I took just the feed reading aspect and [put it on GitHub](https://github.com/alexangas/podcast-feed-reader).
There were still maintenance problems (and bugs) because the stream reading code attempting to meet those goals [was so complex](https://github.com/alexangas/podcast-feed-reader/blob/b09d0e6757c44a5bfd82cc0ac46510070b82c103/src/PodcastFeedReader/Readers/FeedReader.cs#L197).
Now that async streams are available, and fortunately the library has fairly good unit test coverage, I'm hopeful the code can be greatly simplified.
Let's dig in and find out!
 