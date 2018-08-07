/* global google, $, console */

// https://google,developers.appspot.com/chart/interactive/docs/spreadsheets#gid

google.load('visualization', '1', {
  packages: ['corechart', 'line']
})

google.setOnLoadCallback(drawChart)

var column_names = []

function drawChart() {
  'use strict'
  // Code to get the data from Google Sheets based on: https://stackoverflow.com/a/33055115
  // Add your sheets url and range below
  var readmeSheetUrl = 'https://docs.google.com/spreadsheets/d/1vrY0zzx-5ck7FqgUZE0ZqP4MN-7OYVHW5jPQNkoZDnk/edit?gid=1790470642'
  var query = new google.visualization.Query(readmeSheetUrl)
  query.send(handleReadmeResponse)
  //

  var pubsSheetUrl = 'https://docs.google.com/spreadsheets/d/1vrY0zzx-5ck7FqgUZE0ZqP4MN-7OYVHW5jPQNkoZDnk/edit?gid=0#gid=0'
  query = new google.visualization.Query(pubsSheetUrl)
  query.send(handleQueryResponse)
}


// Code to sort table based on: https://www.w3schools.com/howto/howto_js_sort_table.asp

function handleReadmeResponse(response) {
  // This is loaded from the README sheet in order to get the column names:
  'use strict'
  var row, col,
    dataTable = response.getDataTable(),
    cols = dataTable.getNumberOfColumns()
  for (col = 0; col < cols; col += 1) {
    column_names.push(dataTable.getValue(0, col))
  }


}


function handleQueryResponse(response) {
  'use strict'
  var row, col, row_array, row_dict,
    sheet_array = [],
    sheet_array_dict = [],
    dataTable = response.getDataTable(),
    number_of_rows = dataTable.getNumberOfRows(),
    number_of_cols = dataTable.getNumberOfColumns()

  for (row = 0; row < number_of_rows; row += 1) {
    row_array = []
    row_dict = {}
    for (col = 0; col < number_of_cols; col += 1) {
      row_dict[column_names[col]] = dataTable.getValue(row, col);
    }
    sheet_array.push(row_dict)
  }
  console.log(sheet_array_dict)
  displayPubs(number_of_rows, number_of_cols, sheet_array)

}

function displayPubs(number_of_rows, number_of_cols, pubs_array) {
  var row, col, pub_item, link, OFFSET = 2,
    track_year = 0,
    year_text,
    preprint_rows = [],
    supplemental_rows = []
  // Collect up the rows of the preprints and the supplementals in case we need
  // to associate them with journal articles.

  for (row = 0; row < number_of_rows; row += 1) {
    if (pubs_array[row].Status == 'published') {
      if (pubs_array[row].Type == 'preprint') {
        preprint_rows.push(row)
      }
      if (pubs_array[row].Type == 'supplemental') {
        supplemental_rows.push(row)
      }
    }
  }

  for (row = 0; row < number_of_rows; row += 1) {
    if (supplemental_rows.includes(row) || preprint_rows.includes(row)) {
      continue
    }
    // This is for the year headings
    if (track_year !=
      String(pubs_array[row].Date).substring(0, 4)) {
      track_year = String(pubs_array[row].Date).substring(0, 4)
      year_anchor = document.createElement('a')
      year_anchor.classList.add('anchor', 'year-anchor')
      year_anchor.id = track_year
      document.getElementById('pubs-list').appendChild(year_anchor)

      year_text = track_year
      if (track_year == new Date().getFullYear()) {
        year_text += ' & in press'
      }
      year_heading = document.createElement('h3')
      year_heading.classList.add('docs-header', 'year-header')
      year_heading.innerHTML = '<a href="#' + track_year + '">' + year_text + ' <i class="fas fa-link anchor-link"></i></a>'
      year_heading.id = track_year
      document.getElementById('pubs-list').appendChild(year_heading)

    }

    // For all pub_items we create a div
    pub_item = document.createElement('div')
    pub_item.classList.add('pub-item')

    // Strong assumption that all items have authors
    if (pubs_array[row].Authors) {
      authors = document.createElement('span')
      authors.classList.add('authors')
      authors.innerHTML = pubs_array[row].Authors + ' '
      pub_item.appendChild(authors)
    } else {
      throw "Missing author on row: " + (row + OFFSET)
    }

    // All items should have dates too...
    if (pubs_array[row].Date) {

      year = document.createElement('span')
      year.classList.add('year')
      if (pubs_array[row].Status == 'published' || pubs_array[row].Type == 'preprint') {

        year.innerHTML = '(' + String(pubs_array[row].Date).substring(0, 4) + '). '
      } else {
        year.innerHTML = '(' + pubs_array[row].Status + '). '

      }
      pub_item.appendChild(year)
    } else {
      throw "Missing date on row: " + (row + OFFSET)
    }

    // All items should have titles too...
    if (pubs_array[row].Title) {
      title = document.createElement('span')
      title.classList.add('title')
      // Create the appropriate link the title will point to
      if (pubs_array[row]['DOI Link']) {
        link = pubs_array[row]['DOI Link']
      } else if (pubs_array[row]['PDF Link']) {
        link = pubs_array[row]['PDF Link']
      }
      if (link) {
        title.innerHTML = '<a href="' + link + '">' + pubs_array[row].Title + '</a>. '

      } else {
        title.innerHTML = pubs_array[row].Title + '. '
      }
      pub_item.appendChild(title)
    } else {
      throw "Missing title on row: " + (row + OFFSET)
    }

    // Again we assume all have a journal, preprint server, conference, etc.,
    // associated with them
    if (pubs_array[row].Journal) {
      journal = document.createElement('span')
      journal.classList.add('journal')
      journal.innerHTML = '<i>' + pubs_array[row].Journal + '</i>. '
      pub_item.appendChild(journal)
    } else {
      throw "Missing journal on row: " + (row + OFFSET)
    }

    // DOI is optional so no errors thrown here
    if (pubs_array[row]['DOI Link'] && pubs_array[row].Type != 'popular science' && pubs_array[row].Type != 'proceedings') {
      doi_text = document.createElement('span')
      var parser = document.createElement('a')
      parser.href = pubs_array[row]['DOI Link']
      doi_text.classList.add('doi-text')
      doi_text.innerHTML = '<a href="' + pubs_array[row]['DOI Link'] + '">' + parser.pathname.substring(1) + '</a> '
      pub_item.appendChild(doi_text)

      doi = document.createElement('span')
      doi.classList.add('doi', 'icon')
      doi.innerHTML = ' <a href="' + pubs_array[row]['DOI Link'] + '"><i class="ai ai-doi" aria-hidden="true"></i></a> '
      pub_item.appendChild(doi)
    }

    var innerHTML
    // Same with PDF, optional so no errors thrown here
    if (pubs_array[row]['PDF Link']) {
      pdf = document.createElement('span')
      pdf.classList.add('pdf', 'icon')
      innerHTML = '<a href="' + pubs_array[row]['PDF Link'] + '">'
      if (pubs_array[row].Type == 'popular science') {
        innerHTML += 'More</a>'
      } else {
        innerHTML += '<i class="far fa-file-pdf"></i></a> '
      }
      pdf.innerHTML = innerHTML
      pub_item.appendChild(pdf)
    }

    // Of course github is optional
    if (pubs_array[row].GitHub) {
      github = document.createElement('span')
      github.classList.add('github', 'icon')
      github.innerHTML = '<a href="' + pubs_array[row].GitHub + '"><i class="fab fa-github"></i></a> '
      pub_item.appendChild(github)
    }
    // As is having an OSF repo associated
    if (pubs_array[row].OSF) {
      osf = document.createElement('span')
      osf.classList.add('osf', 'icon')
      osf.innerHTML = '<a href="' + pubs_array[row].OSF + '"><i class="ai ai-osf" aria-hidden="true"></i></a> '
      pub_item.appendChild(osf)
    }

    // Deal with preprints by adding them to published articles
    var current_preprint_index, preprint
    if (pubs_array[row].Type == 'journal article') {
      for (var row_index = 0; row_index < preprint_rows.length; row_index++) {
        current_preprint_index = preprint_rows[row_index]
        if (pubs_array[current_preprint_index].Title.toLowerCase() == pubs_array[row].Title.toLowerCase()) {
          // We found a preprint associated with the current journal
          // article
          preprint = document.createElement('span')
          preprint.classList.add('preprint', 'icon')

          if (pubs_array[current_preprint_index].Journal.toLowerCase() == 'biorxiv') {
            preprint.innerHTML = '<a href="' + pubs_array[current_preprint_index]["DOI Link"] + '"><i class="ai ai-biorxiv" aria-hidden="true"></i></a> '

          } else if (pubs_array[current_preprint_index].Journal.toLowerCase() == 'arxiv') {

            preprint.innerHTML = '<a href="' + pubs_array[current_preprint_index]["DOI Link"] + '"><i class="ai ai-arxiv" aria-hidden="true"></i></a> '

          } else if (pubs_array[current_preprint_index].Journal.toLowerCase() == 'psyarxiv') {

            preprint.innerHTML = '<a href="' + pubs_array[current_preprint_index]["DOI Link"] + '"><i class="ai ai-psyarxiv" aria-hidden="true"></i></a> '
          }
          pub_item.appendChild(preprint)

          console.log('I added a preprint to article: ' + pubs_array[row].Title, pubs_array[current_preprint_index].Journal)

          preprint_rows.splice(row_index, 1)

          break
        }

      }

      for (row_index = 0; row_index < supplemental_rows.length; row_index++) {
        current_supplemental_index = supplemental_rows[row_index]
        if (pubs_array[current_supplemental_index].Title.toLowerCase() == pubs_array[row].Title.toLowerCase()) {
          // We found a preprint associated with the current journal
          // article
          supplemental_text = document.createElement('span')
          supplemental_text.classList.add('supplemental-text')
          supplemental_text.innerHTML = '<br>Supplemental: '
          pub_item.appendChild(supplemental_text)

          supplemental = document.createElement('span')
          supplemental.classList.add('supplemental', 'icon')
          supplemental.innerHTML = '<a href="' + pubs_array[current_supplemental_index]["PDF Link"] + '"><i class="far fa-file-pdf"></i></a> '
          pub_item.appendChild(supplemental)

          console.log('I added a supplemental to article: ' + pubs_array[row].Title, pubs_array[current_supplemental_index].Journal)

          supplemental_rows.splice(row_index, 1)

          break
        }

      }

    }

    document.getElementById('pubs-list').appendChild(pub_item)



  }

  document.getElementById('loader').style.display = "none"

}
