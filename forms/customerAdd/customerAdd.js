
let req = ""
let query = ""
let results = ""
let pw = "Clases2021"  // put your database password here
let netID = "amr66568"
let emailData = []

customerAdd.onshow=function(){
       // get all the pet data from the database when program loads
    query = "SELECT email FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)

    if (req.status == 200) { //transit worked.
        emailData = JSON.parse(req.responseText)  // parse data in an array
        console.log(emailData)
    } else {
        // transit error
        console.log("Error")  
    }  
}



btnSubmitAdd.onclick=function(){
    let FirstName = inptFirstName.value
    let LastName = inptLastName.value
    let email = inptEmail.value
    let password = inptPassword.value
    let repeatPass = inptPasswordRepeat.value
    let found = false
    
    if(!FirstName || !LastName || !email || !password || !repeatPass){
    lblAlertSign.value= "Fill out all columns"
    }
    else {
      for (i = 0; i < emailData.length; i++) {
          if (email == emailData[i][0]){
              found = true
              lblAlertSign.value= "There is a customer with this email already"
              break // if found the item in the database jump out of loop
          }
          if (found == false) {
            console.log('No customer with this email')
            if (password != repeatPass)
              lblAlertSign.value="The two passwords don't match"
            if (password == repeatPass) 
              query = "INSERT INTO customer (first_name, last_name, email, password) VALUES ('" + FirstName + "', '" + LastName + "', '" + email + "', '" + password + "')"

              
              req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
              if (req.status == 200) {
                  if (req.responseText == 500)
                      lblAlertSign.value = "You have successfully sign up!"
                  else
                      lblAlertSign.value = "There was a problem with adding the customer to the database."
                  } 
                  
                  else 
                   lblAlertSign.value = "Error: " + req.status
    }
    }
    }
    }