const SVG = require("./lib/svg");
const {writeFile} = require('fs/promises');
const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require("./lib/shapes");

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
    },
    {
        type: "input",
        name: "textColor",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shapeColor",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// Function to write data to file
function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}
function getData(){
    inquirer.prompt(questions).then((answers) => {
console.log(answers);
let shape;
switch(answers.shape){
    case "circle":
            shape = new Circle();
            break;

          case "square":
            shape = new Square();
            break;

          default:
            shape = new Triangle();
            break;
}
shape.setColor(answers.shapeColor);

const svg = new SVG();
svg.setText(answers.text, answers.textColor);

svg.setShape(shape);


return writeFile("SVG.svg", svg.render());
})}
getData();
//() means exectute the function
//prompt we can call thru json package