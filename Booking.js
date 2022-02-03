const array = [['Nome', 'Nota', 'Avaliação', 'Preço']]

const propertyCards = document.querySelectorAll("._5d6c618c8");

propertyCards.forEach( property => {

  const msg = '-';

  let nome = property.querySelector("._c445487e2");
  nome = checkForNull(nome, msg);

  let avaliacao = property.querySelector("._6e869d6e0");
  avaliacao = checkForNull(avaliacao, msg);
  if (avaliacao != msg) {
    avaliacao = avaliacao.slice(0, avaliacao.search("avali"));
  }

  let nota = property.querySelector(".bd528f9ea6");
  nota = checkForNull(nota, msg);

  let preco = property.querySelector("._e885fdc12");

  preco = checkForNull(preco, msg);
  if (preco != msg) {
      preco = preco.slice(2);
  }

  const subarray = [nome, nota, avaliacao, preco]
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


exportToCsv('export.csv', array)
