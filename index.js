const csv = require('csv-parser');
const fs = require('fs');

const myArray = (countrySelected, outputFileName) =>{
    fs.readFile('input_countries.csv', 'utf8', function(err, data)
    {
        if (err)
        {
            console.log(err)
        }
        // Get an array of comma separated lines`
        let linesExceptFirst = data.split('\n').slice(1);
        var addedHeaders;

        // Turn that into a data structure we can parse (array of arrays)
        let linesArr = linesExceptFirst.map(line=>line.split(','));
        var filePath = `./${outputFileName}`; 
        
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        let fileOutput = linesArr.filter((country) => country[0] === countrySelected)
        console.log(fileOutput.toString())
        let stringVersion = fileOutput.toString();

        const csvHeaders = 'name,quantity,price\n'
        let result = csvHeaders.concat(stringVersion);
        console.log(result)

        // Write out new file
        fs.writeFileSync(`${outputFileName}`, result);
    });
}

myArray('Canada', 'canada.txt');
myArray('United States', 'usa.txt')