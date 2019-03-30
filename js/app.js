/*
Author - Folajin Tobi
Github Username - @tobbhie
Instagram - @to_bbhie
*/

//Declaring UI variables
const gpForm = document.querySelector('#gp-form'),
    tBody = document.querySelector('tbody'),
    addCourse = document.querySelector('.add-course'),
    gradeTitle = document.querySelector('#grade'),
    gradeContent = document.getElementsByClassName('grade-row');

//Initialize Events
initEvents();

function initEvents() {
    gpForm.addEventListener('submit', function(e) {
        document.querySelector('#loading').style.display = 'block';
        document.querySelector('#outcome').style.display = 'none';
        setTimeout(calculateGp, 1099);

        e.preventDefault();
    });
    tBody.addEventListener('click', dCourse);
    addCourse.addEventListener('click', aCourse);
}

function calculateGp() {

    const scores = document.getElementsByClassName('score'),
        courses = document.getElementsByClassName('course'),
        units = document.getElementsByClassName('unit');
    let scoresToNum = 0,
        totalGrading = 0,
        totalUnit,
        scoreArr = [],
        unitArr = [],
        result;


    for (let i = 0; i < scores.length; i++) {
        if (scores[i].value === '' || courses[i].value === '' || units[i].value === '') {
            showError('Fill in the required details'); //Checks Input
            break;
        } else if (scores[i].value > 100 || scores[i].value < 0) {
            showError('Enter a value between 0 and 100'); // Checks Input Validity
            break;
        } else {
            document.querySelector('#outcome').style.display = 'block';
            //Mutate inputs to array
            scoresToNum = parseInt(scores[i].value);
            unitToNum = Math.floor(parseInt(units[i].value));
            scoreArr.push(scoresToNum);
            unitArr.push(unitToNum);

            //Get Grading and CGPA
            if (i === scores.length - 1) {
                totalUnit = unitArr.reduce(sumUp);
            }

            //Summary of the CGPA Calculator
            totalGrading += grading(scoresToNum, unitToNum);
            result = totalGrading / totalUnit;
            if (!isNaN(result)) {
                const cgpa = document.getElementById('cgpa');
                document.getElementById('outcome').style.display = 'block';
                cgpa.value = result.toFixed(2);
            }

            //Add all score inputs from user and convert to percentage
            if (i === scores.length - 1) {
                let totalScore = scoreArr.reduce(sumUp);
                totalScore = (totalScore / (100 * scores.length)) * 100;
                //Display On Page 
                const percentage = document.getElementById('percentage');
                percentage.value = totalScore.toFixed(2);
            }

            //Get the grade equivalent of course score
            // for (let i = 0; i < scores.length; i++) {
            //     if (scoresToNum >= 70) {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('A'));
            //     } else if (scoresToNum >= 60) {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('B'));
            //     } else if (scoresToNum >= 50) {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('C'));
            //     } else if (scoresToNum >= 46) {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('D'));
            //     } else if (scoresToNum >= 40) {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('E'));
            //     } else {
            //         gradeTitle[i].style.display = 'block';
            //         gradeContent[i].style.display = 'block';
            //         gradeContent[i].appendChild(document.createTextNode('F'));
            //     }
            // }

        }
        document.querySelector('#loading').style.display = 'none';
    }

    function grading(score, unit) {
        if (score >= 70) {
            return 5 * unit;
        } else if (score >= 60) {
            return 4 * unit;
        } else if (score >= 50) {
            return 3 * unit;
        } else if (score >= 46) {
            return 2 * unit;
        } else if (score >= 40) {
            return 1 * unit;
        } else {
            return 0 * unit;
        }
    }

    //Adding up function
    function sumUp(total, num) {
        return total + num;
    }

    // // Clear input
    // taskInput.value = '';

}


// Add Task
function aCourse(e) {

    // Declaring Variables for UI
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const link = document.createElement('a');
    const th = document.createElement('th');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    const icon = document.createElement('i');
    const td4 = document.createElement('td');
    const input3 = document.createElement('input');

    input1.className = 'form-control course';
    input1.setAttribute('type', 'text');
    input1.setAttribute('placeholder', 'e.g MTH101');

    input3.className = 'form-control unit';
    input3.setAttribute('type', 'number');
    input3.setAttribute('placeholder', 'e.g 2');

    input2.className = 'form-control score';
    input2.setAttribute('type', 'number');
    input2.setAttribute('placeholder', 'e.g 70');

    td.appendChild(input1);
    td4.appendChild(input3);
    td2.appendChild(input2);

    th.setAttribute('scope', 'row');
    th.setAttribute('class', 'grade-row');

    td3.className = 'del';

    icon.className = 'fa fa-times-circle';

    link.className = 'delete-course';
    link.setAttribute('href', '#')
    link.appendChild(icon);

    td3.appendChild(link);

    tr.appendChild(td);
    tr.appendChild(td4);
    tr.appendChild(td2);
    tr.appendChild(th);
    tr.appendChild(td3);

    //Append to table body
    tBody.appendChild(tr);

    e.preventDefault();
}

//Show UI error
function showError(error) {
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#outcome').style.display = 'none';
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const err = document.createElement('div');
    err.className = 'alert alert-danger';

    err.appendChild(document.createTextNode(error));
    card.insertBefore(err, heading);

    // Clear error after 2 seconds
    setTimeout(clearError, 2000);
}

// Clear UI error
function clearError() {
    document.querySelector('.alert').remove();
}

//Delete Course
function dCourse(e) {
    if (e.target.parentElement.classList.contains('delete-course')) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
}