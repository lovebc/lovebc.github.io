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
    var readmeSheetUrl =     'https://docs.google.com/spreadsheets/d/1vrY0zzx-5ck7FqgUZE0ZqP4MN-7OYVHW5jPQNkoZDnk/edit?gid=1790470642'
    var query = new google.visualization.Query(readmeSheetUrl)
    query.send(handleReadmeResponse)
    //

    var pubsSheetUrl = 'https://docs.google.com/spreadsheets/d/1vrY0zzx-5ck7FqgUZE0ZqP4MN-7OYVHW5jPQNkoZDnk/edit?gid=0#gid=0'
    var query = new google.visualization.Query(pubsSheetUrl)
    query.send(handleQueryResponse)
}


// Code to sort table based on: https://www.w3schools.com/howto/howto_js_sort_table.asp

function handleReadmeResponse(response) {
    // This is loaded from the README sheet in order to get the column names:
    'use strict'
    var row, col, cols =[],
        dataTable = response.getDataTable(),
        cols = dataTable.getNumberOfColumns()
    for (col = 0; col < cols; col += 1) {
        column_names.push(dataTable.getValue(0, col))
    }


}


function handleQueryResponse(response) {
    'use strict'
    var row, col, row_array, row_dict,
        sheet_array = [], sheet_array_dict = [],
        dataTable = response.getDataTable(),
        number_of_rows = dataTable.getNumberOfRows(),
        number_of_cols = dataTable.getNumberOfColumns()

    for (row = 0; row < number_of_rows; row += 1) {
        row_array = []
        row_dict = {}
        for (col = 0; col < number_of_cols; col += 1) {
            // row_array.push(dataTable.getValue(row, col))
            // row_dict.push({
            //               key:
            //               value:
            //           });

            row_dict[column_names[col]] = dataTable.getValue(row, col);

        }
        // sheet_array.push(row_array)
        sheet_array.push(row_dict)
    }
    console.log(sheet_array_dict)
    displayPubs(number_of_rows, number_of_cols, sheet_array)

}


function displayPubs(number_of_rows, number_of_cols, pubs_array) {
  var row, col, pub_item, link
  for (row = 0; row < number_of_rows; row += 1) {
    pub_item = document.createElement('div')
    pub_item.classList.add('pub-item')


    authors = document.createElement('span')
    authors.classList.add('authors')
    authors.innerHTML = pubs_array[row].Authors + ' '
    pub_item.appendChild(authors)


    year = document.createElement('span')
    year.classList.add('year')
    if (pubs_array[row]['Status'] == 'published' || pubs_array[row]['Type'] == 'preprint') {

    year.innerHTML = '(' + String(pubs_array[row].Date).substring(0, 4) + '). '
  } else {
    year.innerHTML = '(' + pubs_array[row].Status + '). '

  }
    pub_item.appendChild(year)

    title = document.createElement('span')
    title.classList.add('title')
    if (pubs_array[row]['DOI Link']) {
      link = pubs_array[row]['DOI Link']
    }
    else if (pubs_array[row]['PDF Link']) {
      link = pubs_array[row]['PDF Link']
    }
    if (link) {
      title.innerHTML = '<a href="' + link + '">' + pubs_array[row].Title + '</a>. '

    } else {
      title.innerHTML = pubs_array[row].Title + '. '

    }
    pub_item.appendChild(title)

    journal = document.createElement('span')
    journal.classList.add('journal')
    journal.innerHTML = '<i>' + pubs_array[row].Journal + '</i>. '
    pub_item.appendChild(journal)

    if (pubs_array[row]['DOI Link'] && pubs_array[row].Type != 'popular science') {
      doi = document.createElement('span')
      var parser = document.createElement('a')
      parser.href = pubs_array[row]['DOI Link']
      doi.classList.add('doi')
      doi.innerHTML = '<a href="' + pubs_array[row]['DOI Link'] + '">' + parser.pathname.substring(1) + '</a> <a href="' + pubs_array[row]['DOI Link'] + '"><i class="ai ai-doi" aria-hidden="true"></i></a> '
      pub_item.appendChild(doi)
    }


        if (pubs_array[row]['PDF Link']) {
          pdf = document.createElement('span')
          pdf.classList.add('pdf')
          if (pubs_array[row].Type == 'popular science') {
            pdf.innerHTML = '<a href="' + pubs_array[row]['PDF Link'] + '">More</a>'

        } else {
          pdf.innerHTML = '<a href="' + pubs_array[row]['PDF Link'] + '"><i class="far fa-file-pdf"></i></a> '

        }
        pub_item.appendChild(pdf)

        }

    // => "example.com:3000"

        if (pubs_array[row]['GitHub']) {
          github = document.createElement('span')
          github.classList.add('github')
          github.innerHTML = '<a href="' + pubs_array[row]['GitHub'] + '"><i class="fab fa-github"></i></a> '
          pub_item.appendChild(github)
        }
        if (pubs_array[row]['OSF']) {
          osf = document.createElement('span')
          osf.classList.add('osf')
          osf.innerHTML = '<a href="' + pubs_array[row]['OSF'] + '"><i class="ai ai-osf" aria-hidden="true"></i></a> '
          pub_item.appendChild(osf)
        }
    document.getElementById('pubs-list').appendChild(pub_item)

  }

}
