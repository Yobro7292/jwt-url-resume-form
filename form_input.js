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
    var social_link_id = 1;

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
        console.log("payload fwbnw");
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