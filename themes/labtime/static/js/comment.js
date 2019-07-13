              // shit fixen voor user feedback afhankelijk van 200 of 400
              // it can take some time for your comment to be processed due to cdn caching time
              // I use recaptcha v2 to avoid more intrusive user behavior analysis on the full page that v3 uses
              // when posting from a phone, v2 can't analyze any mouse movement over the recaptcha box,
              // so you need to select annoying image tiles, or reach me via twitter, linkedin or facebook
              // you can use markdown syntax to format your comment, <markdown syntax url here>

              var url = window.location.pathname
              var arr = new Array()
              arr = url.split("/")
              page_name = arr.slice(arr.length -2).join("")
              page_name = "_" + page_name.replace(/-/g, "_")

              var xmlhttp = new XMLHttpRequest()

              xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                  var ml = "HTTP response: " + xmlhttp.status + " "
                  if (xmlhttp.status == 200) {
                    ml = ml + "good request"
                  } else if (xmlhttp.status == 400) {
                    ml = ml + "bad request"
                  }
                  ml = ml + "<br>"
                  ml = ml + xmlhttp.response
                  document.getElementById("result").innerHTML = ml
                }
              }
              
              function msg() {
                var response = grecaptcha.getResponse()
                var postvar = {
                    "user_name"       : document.getElementById("fname").value,
                    "user_site"       : document.getElementById("fsite").value,
                    "page_name"       : page_name,
                    "comment_data"    : document.getElementById("fcomment").value,
                    "recaptcha_token" : response,
                }

                xmlhttp.open("POST", "https://api.lab-time.it/v1")
                xmlhttp.setRequestHeader("Content-Type", "application/json")
                xmlhttp.send(JSON.stringify(postvar))
              }

              function show() {
                var x = document.getElementById("commentformblock");
                 if (x.style.display === "none") {
                   x.style.display = "block";
                 } else {
                   x.style.display = "none";
                 }
               }
