# outputs.csv

## Overview
The comma-separated values file ```outputs.csv``` in this directory contains all lab outputs that we want to showcase on the website under the Publications headings, here: http://bradlove.org/#publications and here: http://bradlove.org/lab#publications.
Both these lists are generated from the same file ```outputs.csv``` and the same code found at ```./_includes/publications.html``` — they are identical except for their URL.

## Columns
### Date
The date the output was received by the journal if a journal article, uploaded to the preprint server if a preprint, or published if a pop-science article.

The date is in ISO 8601 format, e.g., ```2018-12-31``` for New Year's Eve 2018. See: https://en.wikipedia.org/wiki/ISO_8601, for more information.

### Type
The type of output, can be: ```journal article```, ```preprint```, ```book chapter```, ```proceedings```, ```popular science```, ```supplemental```, ```dataset```.

### Status
Most outputs should be set to ```published```. Notable exceptions are journal articles that are ```in press``` and the case of preprints (see below).

If a preprint is published (i.e., if it has a journal article associated with it) the status should be set to ```published```. If a preprint does not have a journal article associated with it, it needs to have its status set to ```unpublished```. This is how the code to display these outputs knows which preprints to give a unique entry to and which to display as an icon next to their journal article.

### Title
The title must be in the exact case needed to be displayed correctly.

### Authors
The format must be APA style. Individual authors names should be in the format: ```Love, B. C.``` — please note the spacing between the initials. Outputs with two authors *do not* have a comma between the author names, only an ampersand: ```Hornsby, A. N. & Love, B. C.```. And outputs with more than two authors have the following format: ```Mack, M. L., Preston, A. R., & Love, B. C.``` — please note the comma before the ampersand.

### Journal
The name of the journal, preprint server, magazine, and so on, that the output appears in/on.

### DOI Link
The URL for the DOI. Please note this is the URL to the DOI, so it must start with ```http://``` and correctly resolve.

### PDF Link
The URL for downloading PDF. Please note this is the URL to the PDF, so it must start with ```http://``` and correctly resolve.

### Editors
The names of the editors if the output appears in a book or conference proceedings — currently not used, so not displayed on the website.

### Website
If the output has a website associated with it — rare but it happens.

### GitHub
The URL for the GitHub repository. Please note this is the URL, so it must start with ```http://``` and correctly resolve.

### OSF
The URL for the OSF repository. Please note this is the URL, so it must start with ```http://``` and correctly resolve.

### Added By
Name of the person in lab who added this output.
