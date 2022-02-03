const array = [['Nome', 'Nota', 'Avaliações']]

const propertyCards = document.querySelectorAll(".listing");

propertyCards.forEach( property => {

  const msg = '-'

  let nome = property.querySelector(".listing_title");
  nome = checkForNull(nome, msg).trim();

  let avaliacao = property.querySelector(".review_count");
  avaliacao = checkForNull(avaliacao, msg);
  if (avaliacao != msg) {
    avaliacao = avaliacao.slice(0, avaliacao.search("aval"));
  }

  let nota = property.querySelector('.ui_bubble_rating');
  try {
      nota = nota.getAttribute('alt').slice(0, 3);
      if (nota.includes("d")) {
          nota = nota.slice(0,1);
      }

  } catch  (err) {
      nota = "-";
  }


  const subarray = [nome, nota, avaliacao]
  array.push(subarray)

});

function checkForNull (param, msg) {
  if (param === null) {
    param = msg
  } else {
    param = param.textContent;
  }
  return param;
}

function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }


exportToCsv('export.csv', array);
