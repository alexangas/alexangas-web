---
path: missing-azurefilecopy-azcopy-task-solved
date: 2020-05-01T11:14:38Z
title: Missing Azure File Copy azcopy task solved
description: >-
  Patching in the missing AzureFileCopy task for Azure Pipelines on hosted Linux Ubuntu build agents.
tags: ["azure-pipelines", "devops", "powershell"]
---

The ability to copy files to Azure storage accounts is a common need for integration with the Azure cloud platform.
For example, it's what updates this static website, hosted in an Azure storage account.
I also prefer using a Linux build agent for some pipelines, especially those that build the front-end of a web application (again, such as this one).
So it was a little surprising that at the time of writing, the [Azure File Copy task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-file-copy) provided by Microsoft does not yet work on Linux build agents, and also appears to be using an older version of `azcopy`.

Looking for alternatives, I expected to find a replacement that centred around the newer cross-platform version of `azcopy`, but could not.
Next, I tried using the Azure CLI and its [storage](https://docs.microsoft.com/en-us/cli/azure/storage?view=azure-cli-latest) subset of commands.
While there was plenty of interesting stuff there, and it appears to use `azcopy` behind the scenes, I found it did not provide the full functionality of that tool.
Plus, it was difficult to troubleshoot with a significant lack of log output.

So instead, I wrote a task template that uses PowerShell Core to download `azcopy`, extract it, and then execute it with the provided parameters.
This worked well!
Here's what the PowerShell part of the script looks like:

```powershell
Invoke-WebRequest 'https://aka.ms/downloadazcopy-v10-linux' -OutFile './azcopy.tar.gz'
tar -zxf './azcopy.tar.gz'
$azCopy = Get-ChildItem 'azcopy*' -Recurse -File | Where-Object { $_.FullName -like '*azcopy_linux*' } | Select-Object $_.FullName
Start-Process -FilePath $azCopy -Wait -NoNewWindow -ArgumentList "${{ parameters.command }}","${{ parameters.source }}${{ parameters.sourcesas }}","${{ parameters.destination }}${{ parameters.destinationsas }}","${{ parameters.options }}"
```

There are a few things you may wish to tweak here, as again I wrote this for deploying the contents of this blog.

First of all, this simply downloads the latest version of `azcopy`, from the [links provided by Microsoft](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10).
You may wish to download a specific release with syntax and behaviour you can be confident will not change.
Fortunately, Microsoft provides a method for [obtaining a static download link](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10#use-azcopy-in-a-script).
(This will initially give you the latest version... if you need an older version, you could have a try at working out the URL based on the releases provided on GitHub - they have the form `https://azcopyvnext.azureedge.net/release20200501/azcopy_linux_amd64_10.4.3.tar.gz`.)

To get around having to find where the files from the extracted archive are copied to the file system, `Get-ChildItem` is used to find the azcopy binary.
Instead, you could amend the flags of `tar` to extract to a known location, in addition to using `--strip-components 1` which will flatten the internal directory structure of the archive.

Apart from those things, this should do the trick!
You can also use this approach for any other missing tooling that you need, or build your own agent, of course.
As a bonus, I found that under Ubuntu the `azcopy` command was 10s of seconds faster than Windows.
So if you're debating whether to switch to a Linux build agent, it's certainly worth looking into.

Below you can find the full YAML task template file at the time of writing this article.
You can find the latest version, plus a version for Windows, on the [GitHub repo for this blog](https://github.com/alexangas/alexangas-web/tree/master/build).
I've also made the [Azure Pipelines output public](https://dev.azure.com/alexangas/blog/_build?definitionId=8).

```yaml
parameters:
  - name: command
    displayName: 'azcopy Command'
    type: string
    default: "--version"
  - name: source
    displayName: 'Source path'
    type: string
  - name: sourcesas
    displayName: 'Source path SAS'
    type: string
    default: ""
  - name: destination
    displayName: 'Destination path'
    type: string
  - name: destinationsas
    displayName: 'Destination path SAS'
    type: string
    default: ""
  - name: options
    displayName: 'Additional options'
    type: string
    default: ""

steps:
  - task: PowerShell@2
    name: azcopy
    condition: eq(variables['Agent.OS'], 'Linux')
    inputs:
      pwsh: true
      targetType: 'inline'
      script: |
        Invoke-WebRequest 'https://aka.ms/downloadazcopy-v10-linux' -OutFile './azcopy.tar.gz'
        tar -zxf './azcopy.tar.gz'
        $azCopy = Get-ChildItem 'azcopy*' -Recurse -File | Where-Object { $_.FullName -like '*azcopy_linux*' } | Select-Object $_.FullName
        Start-Process -FilePath $azCopy -Wait -NoNewWindow -ArgumentList "${{ parameters.command }}","${{ parameters.source }}${{ parameters.sourcesas }}","${{ parameters.destination }}${{ parameters.destinationsas }}","${{ parameters.options }}"
```

_All of the above code has been written and tested with PowerShell Core on Microsoft-hosted agents on the date of this post._
