---
path: troubleshooting-powershell-in-devops-tooling
date: 2020-04-29T15:36:31Z
title: Troubleshooting PowerShell in DevOps tooling
description: >-
  Tips and tricks to troubleshoot PowerShell when it is executed by DevOps tools such as TeamCity or Azure DevOps Pipelines.
tags: ["powershell", "devops"]
---

Both Azure DevOps and TeamCity feature the ability to execute PowerShell - either the actual scripts themselves, or as arbitrary inline script.
While a helpful (and necessary) feature, it can be a time consuming and painstaking process if this doesn't behave as expected!

One of the issues can be that it is difficult to determine how the script is being executed.
The tooling can pass parameters in such that they are something different to what's expected.
In the case of an inline script, the contents can be modified as the tool converts the text of that script to an actual script file on storage.

So here are a few methods you can use to output debugging information to troubleshoot this issue.

## Bootstrap debug output

First... to get output information about the currently running process, the script that outputs that information much be the currently running process, make sense?
So what follows either needs to be added to the script you are debugging preferably as the first line after `params`, or should be its own script which calls the debug target.
(Be warned that the latter could leave you open to a [Heisenbug](https://en.wikipedia.org/wiki/Heisenbug) / the [observer effect](https://en.wikipedia.org/wiki/Observer_effect_(information_technology)).)

## Output the PowerShell script's arguments

The following will display the "not-named" arguments passed to a script.
Named arguments (i.e. parameters) are not displayed.

```powershell
Write-Host "Arguments ($($args.count)): $args`r`n$($args | Out-String)"
```

Example output from executing `RunScript.ps1 somearg1 somearg2,somearg3`

```
Arguments (2): somearg1 System.Object[]
somearg1
somearg2
somearg3
```

As you can see, the `args` are displayed twice.
On the first line all arguments are displayed in a row, where a passed array which is its own argument will appear as `System.Object[]`.
Subsequently, each argument is displayed on its own line.


## Output the PowerShell script's parameters

To display the keys and values assigned to the script's `params`, we are able to take advantage of the automatic variable `$PSBoundParameters`.
This provides output of a nice hashtable showing which parameter key has been assigned with what value.

```powershell
Write-Host "Bound parameters:`r`n$($PSBoundParameters | Out-String)"
```

Example output from executing `RunScript.ps1 -a "boo"`

```
Bound parameters:

Key Value
--- -----
a   boo
```

## Output the PowerShell script's contents

Finally, particularly for inline scripts, we may also wish to output the script's contents.

```powershell
'_ScriptDebugStart_' | Out-Null
$_scriptText = Get-Content -Raw $PSCommandPath
Write-Host "* Arguments ($($args.count)): $args`r`n$($args | Out-String)"
Write-Host "* Bound parameters:`r`n$($PSBoundParameters | Out-String)"
Write-Host "* Script text:"
Write-Host $($_scriptText -replace '(?ms)''_ScriptDebugStart_.+_ScriptDebugEnd[\w\s''|-]+')
'_ScriptDebugEnd_' | Out-Null
```

Again, another automatic variable comes into play here: `$PSCommandPath`.
This enables us to very simply read in the contents of the script.

The only trickery here can be found on the first and last two lines.
It would of course be preferable not to include the debug code as part of this.
So we can simply strip it out with a regex, and write that output to the host.

If you don't like the regex replace approach, all of the above can be written as a single line, and obviously the parts not needed can be removed:

```powershell
$_scriptTxt = Get-Content -Raw $PSCommandPath ; Write-Host "* Arguments ($($args.count)): $args`r`n$($args | Out-String)`r`n* Bound parameters:$($PSBoundParameters | Out-String)* Script text:`r`n$($_scriptTxt -replace '\$_scriptTxt.+')"
```

_All of the above code has been written and tested on PowerShell Core 7 under both Windows and Linux, as well as PowerShell 5.1._
