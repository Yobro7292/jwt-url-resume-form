// Function to generate JWT token
function generateJWT(payload) {
    const header = { alg: "HS256", typ: "JWT" };
    const secret = "yyu";
    const sHeader = JSON.stringify(header);
    const sPayload = JSON.stringify(payload);
    const token = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, { utf8: secret });
  
    return token;
}


$(document).ready(function() {

    var image_url = "";
    var social_link_id = 1;

    //function to check if image is uploaded or not 
    function toggleUploadButton(){
        if(image_url){
            $('#uploaded_image').show();
            $('#upload_button').hide();
            $('#uploaded_image').attr('style', `background-image: url(${image_url})`)
        } else {
            $('#uploaded_image').hide();
            $('#upload_button').show();
        }
    }

    // function for process file 
    function processFile(file){
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image_url = e.target.result;
                toggleUploadButton();
            };
    
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    }
     //getting profile image data url
     {
        toggleUploadButton();
         $('#file-upload').on('change', function(event) {
            const file = event.target.files[0];
            processFile(file);
        });
     }

     // handling drag and drop functionality 
     {
         const dropArea = $('#drop-area');
         dropArea.on('dragover', function(event) {
             event.preventDefault();
             dropArea.addClass('bg-gray-200'); 
         });
 
         dropArea.on('dragleave', function(event) {
             event.preventDefault();
             dropArea.removeClass('bg-gray-200'); 
         });
         dropArea.on('drop', function(event) {
             event.preventDefault();
             dropArea.removeClass('bg-gray-200');
             
             const file = event.originalEvent.dataTransfer.files[0];
             processFile(file);
         });
     }

    //click event on the add button of the custom select of the social links 
    {
        //adding new social link 
        $('#add_more_links').on('click', function() {
           var new_social_link_section = `
           <div class="flex w-full gap-2 items-center">
                <select class="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50" name="social_link${social_link_id+1}_type" id="social_link${social_link_id+1}_type">
                    <option value="linkedin">linkedin</option>
                    <option value="website">website</option>
                    <option value="instagram">instagram</option>
                    <option value="twitter">twitter</option>
                </select>
                <input
                type="text"
                name="social_link${social_link_id+1}_value"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter URL"
                id="social_link${social_link_id+1}_value"
                />
            </div>
           `;
           $('#social_links_container').append(new_social_link_section);
           social_link_id++;
        });
    }
   
    // generate a JWT token when submitted
    $('#submit').on('click', function() {
        const name = $('#full_name').val();
        const role = $('#role').val();
        const bio = $('#bio').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        var social_links = [];

        //getting social link in array
        for(var i=1; i<=social_link_id;i++){            
            var type = $(`#social_link${i}_type`).val();
            var value = $(`#social_link${i}_value`).val();
            social_links.push({
                type,
                href: value
            });
        }

        // Create the payload
        const payload = {
            name,
            role,
            bio,
            image_url,
            contact_details: {
                email,
                phone,
                address,
                social_links
            }
        };

        console.log("payload",payload);
        // Generate the JWT token
        // const token = generateJWT(payload);

        // Update the URL with the token parameter
        // const url = `${window.location.origin}?token=${token}`;
        // window.location.href = url;
    });
});