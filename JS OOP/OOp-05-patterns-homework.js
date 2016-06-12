function solve(){
    function containsConsecutiveSpaces(title) {
        if (!(typeof title === 'string')) {
            throw new Error('Title must be string to check for consecutive spaces');
        }
        else {
            var len = title.length,
                i;

            for (i = 0; i < len - 1; i += 1) {

                if (title[i] == ' ' && title[i + 1] == ' ') {
                    return true;
                }
            }

            return false;
        }
    }

    function validateTitle(title) {

        if (typeof title != 'string') {
            throw new Error('The title must be a string!');
        }

        if (!((typeof title == 'string')
               && title.length > 0
               && title[0] != ' '
               && title[title.length - 1] != ' '
               && !containsConsecutiveSpaces(title))) {

            throw new Error('Invalid title');
        }
    }

    function validateArray(arr) {

        if (!Array.isArray(arr)) {
            throw new Error('Parameter must be a valid array!');
        }
        if (arr.length == 0) {
            throw new Error('The parameter cannot be an empty array!');
        }
    }

    function validateStudentName(name) {
        if (!(typeof name === 'string')) {
            throw new Error('The name of a student must be a string!');
        }
        else {
            var n = name.split(' ');
            if (n.length != 2) {
                throw new Error('A valid student name consists of \'FirstName\' \'LastName\'!');
            }

            var firstname = n[0],
                flen = n[0].length,
                lastname = n[1],
                llen = n[1].length,
                i;
            
            if (firstname[0].toUpperCase()!=firstname[0]) {
                throw new Error('Firstname should start with capital letter');
            }

            if (lastname[0].toUpperCase() != lastname[0]) {
                throw new Error('Lastname should start with capital letter');
            }
            for (i = 1; i < flen; i+=1) {
                if (firstname[i].toLowerCase()!=firstname[i]) {
                    throw new Error('Firstname shoud contain only lower letters (except the first letter).');
                }
            }

            for (i = 1; i < llen; i+=1) {
                if (lastname[i].toLowerCase() != lastname[i]) {
                    throw new Error('Lastname shoud contain only lower letters (except the first letter).');
                }
            }
            
        }
    }

    function validateResult(result) {
        if (!((typeof result==='object') 
            && result.hasOwnProperty('StudentID')
            && (typeof result['StudentID'] === 'number')
            && result.hasOwnProperty('score')
            && (typeof result['score']==='number'))) {

            throw new Error('Invalid result format');
        }
    
    }

    function validateResults(results,course) {
        if (!Array.isArray(results)) {
            throw new Error('Results must be in array format!');
        }
        var i,
            len = results.length;
        for (i = 0; i < len; i+=1) {
            validateResult(results[i]);
        }
      
    }
    function compareScores(s1, s2) {
        if (score(s1) > score(s2)) {
            return -1;
        }
        else if (score(s1) < score(s2)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function score(s1) {
        return 0.75 * s1.score + 0.25 * s1.homeworks;
    }

    var Course = {
        init: function (title, presentations) {
            this.students = [];

            validateTitle(title);
            this.title = title;
            validateArray(presentations);
            var i,
                len = presentations.length;

            for (i = 0; i < len; i+=1) {
                validateTitle(presentations[i]);
            }
            this.presentations = presentations;
        },
        addStudent: function (name) {
            validateStudentName(name);
            var n = name.split(' ');
            var student = {
                firstname: n[0],
                lastname: n[1],
                //??? ID   .... bez +1 ????
                id: this.students.length + 1,
                //dali da go slagame tuk?????
                score: 0,
                homeworks:0
            };
            this.students.push(student);
            //return this; ????????
            return student.id;
        },
        getAllStudents: function () {
            //??????
            return this.students.map(function (student) {
                return {
                    firstname: student.name,
                    lastname: student.lastname,
                    id: student.id
                };
            });
        },
        submitHomework: function (studentID, homeworkID) {
            if (studentID<this.students[0].id || studentID>this.students[this.students.length-1]) {
                throw new Error('Student with id ' + studentID + ' does not exist');
            }
            //id<0 ?????
            if (homeworkID<=0 || homeworkID>this.presentations.length) {
                throw new Error('There is no ' + homeworkID + ' presentation');
            }
            var i,
                len = this.students.length;

            for (var i = 0; i < len; i+=1) {
                if (this.students[i].id==studentID) {
                    this.students[i].homeworks += 1;
                }
            }
            return this;
        },
        pushExamResults: function (results) {

            validateResults(results, this);
            var ids = [];
            var i,
                j,
                len = results.length,
                stLen = this.students.length;

            for (i = 0; i < len; i += 1) {

                ids.push(results[i].id);

                if (results[i].StudentID<this.students[0].id || results[i].StudentID>this.students.length) {
                    throw new Error('Such id ' + results[i].StudentID + ' does not exist to insert results.');
                }
         
                for (j = 0; j < ids.length; j += 1) {
                    if (ids[i] == results[i].StudentID) {
                        throw new Error('Repeating ID-s: some student tried to cheat!');
                    }
                }
            }     

            for (i = 0; i < len; i+=1) {
                for (j = 0; j < stLen; j+=1) {
                    if (this.students[j].id==results[i].StudentID) {
                        this.students[j].score = results[i].score;
                    }
                }
            }
            return Course;
            
        },
        getTopStudents: function () {
            var stud = this.students.splice().sort(compareScores);

            return stud;
        }
    };

   return Course;
}
