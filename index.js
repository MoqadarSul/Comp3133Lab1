const csv = require('csv-parser');
const fs = require('fs');

const myArray = (countrySelected, outputFileName) =>{
    fs.readFile('input_countries.csv', 'utf8', function(err, data)
    {
        if (err)
        {
            console.log(err)
        }
        // array of comma separated values
        let input_countries_without_header = data.split('\n').slice(1);
       
        // convert it into array of array so we can parse it
        let linesArr = input_countries_without_header.map(line=>line.split(','));
        var filePath = `./${outputFileName}`; 
        //if file exists we delete it.
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        //if column is country selected then add it to new array (fileoutput)
        let fileOutput = linesArr.filter((country) => country[0] === countrySelected)
        //convert to string
        let stringVersion = fileOutput.toString();
        //adding the headers
        const csvHeaders = 'name,quantity,price\n'
        //concating the two strings.
        let result = csvHeaders.concat(stringVersion);
        // Write out new file
        fs.writeFileSync(`${outputFileName}`, result);
    });
}

myArray('Canada', 'canada.txt');
myArray('United States', 'usa.txt')