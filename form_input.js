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
    var edu_id = 1;
    var work_ex_id = 1;
    var project_id = 1;
    var tech_skill_id = 1; 
    var skill_id = 1;
    var language_id = 1;
    var interest_id = 1;

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
            social_link_id++;
           var new_social_link_section = `
           <div class="flex w-full gap-2 items-center">
                <select class="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50" name="social_link${social_link_id}_type" id="social_link${social_link_id}_type">
                    <option value="linkedin">linkedin</option>
                    <option value="website">website</option>
                    <option value="instagram">instagram</option>
                    <option value="twitter">twitter</option>
                </select>
                <input
                type="text"
                name="social_link${social_link_id}_value"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter URL"
                id="social_link${social_link_id}_value"
                />
            </div>
           `;
           $('#social_links_container').append(new_social_link_section);
        });
    }

    //click event on the add button of the education 
    {
        //adding new education
        $('#add_more_education').on('click', function() {
            edu_id++;
           var new_edu_section = `
            <div class="md:col-span-2 mt-12">
                <label for="edu${edu_id}_degree">Degree Name</label>
                <input
                    type="text"
                    name="edu${edu_id}_degree"
                    id="edu${edu_id}_degree"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Master in Computer Science"
                />
            </div>
            <div class="md:col-span-3 mt-12">
                <label for="eduv_university">University Name</label>
                <input
                    type="text"
                    name="edu${edu_id}_university"
                    id="edu${edu_id}_university"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Saint Pal University, CA"
                />
            </div>
            <div class="md:col-span-2">
                <label for="edu${edu_id}_date">Attend Date</label>
                <input class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="date" id="edu${edu_id}_date" name="edu${edu_id}_date">
            </div>
            <div class="md:col-span-3">
                <label for="edu${edu_id}_description">Short Description</label>
                <input
                    type="text"
                    name="edu${edu_id}_description"
                    id="edu${edu_id}_description"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder=""
                />
            </div>
           `;
           $('#edu_details').append(new_edu_section);
        });
    }
   
    //click event on the add Work experience 
    {
        $('#add_more_work_experience').on('click', function() {
            work_ex_id++;
           var new_work_ex_section = `
            <div class="md:col-span-3 mt-12">
                <label for="org${work_ex_id}_name">Orgenization Name</label>
                <input
                    type="text"
                    name="org${work_ex_id}_name"
                    id="org${work_ex_id}_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="XYZ LLC"
                />
            </div>
            <div class="md:col-span-2 mt-12">
                <label for="org${work_ex_id}_designation">Designation</label>
                <input
                    type="text"
                    name="org${work_ex_id}_designation"
                    id="org${work_ex_id}_designation"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Junior Software Developer"
                />
            </div>
            <div class="md:col-span-5">
                <label for="org${work_ex_id}_description">Description</label>
                <textarea
                    rows="3"
                    name="org${work_ex_id}_description"
                    id="org${work_ex_id}_description"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                ></textarea> 
            </div>
            <div class="md:col-span-5">
                <div class="flex items-center justify-between w-full gap-4">
                    <div class="w-full">
                        <label for="org${work_ex_id}_start_date">Start Date</label>
                        <input class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="date" id="org${work_ex_id}_start_date" name="org${work_ex_id}_start_date">
                    </div>
                    <div class="w-full">
                        <label for="org${work_ex_id}_end_date">End Date</label>
                        <input class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="date" id="org${work_ex_id}_end_date" name="org${work_ex_id}_end_date">
                    </div>
                </div>
            </div>
           `;
           $('#work_details').append(new_work_ex_section);
        });
    }
   
    //click event on the add projects
    {
        $('#add_more_project').on('click', function() {
            project_id++;
           var new_project_section = `
            <div class="md:col-span-3 mt-12">
                <label for="pro${project_id}_title">Title</label>
                <input
                    type="text"
                    name="pro${project_id}_title"
                    id="pro${project_id}_title"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder=""
                />
            </div>
            <div class="md:col-span-2 mt-12">
                <label for="pro${project_id}_date">Completed Date</label>
                <input class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="date" id="pro${project_id}_date" name="pro${project_id}_date">
            </div>
            <div class="md:col-span-5">
                <label for="pro${project_id}_href">Project Link</label>
                <input
                    type="text"
                    name="pro${project_id}_href"
                    id="pro${project_id}_href"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder=""
                />
            </div>
            <div class="md:col-span-5">
                <label for="pro${project_id}_description">Description</label>
                <textarea
                rows="3"
                name="pro${project_id}_description"
                id="pro${project_id}_description"
                class="border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
                ></textarea>
            </div>
           `;
           $('#project_details').append(new_project_section);
        });
    }
   
    //click event on the add tech skills
    {
        $('#add_more_skill').on('click', function() {
            tech_skill_id++;
           var new_tech_skill_section = `
             <div class="md:col-span-5 mt-12">
                <label for="skill${tech_skill_id}_name">Skill Name</label>
                <input
                    type="text"
                    name="skill${tech_skill_id}_name"
                    id="skill${tech_skill_id}_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Master in UI designing"
                />
            </div>
            <div class="md:col-span-5">
                <label for="skill${tech_skill_id}_description">How long you familer with this skill</label>
                <textarea
                rows="3"
                name="skill${tech_skill_id}_description"
                id="skill${tech_skill_id}_description"
                class="border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
                ></textarea>
            </div>
           `;
           $('#tech_skills_details').append(new_tech_skill_section);
        });
    }

    //click event on the add sp skills
    {
        $('#add_more_sp_skill').on('click', function() {
            skill_id++;
           var new_skill_section = `
             <div class="md:col-span-4 mt-6">
                <label for="sp_skill${skill_id}_name">Skill Name</label>
                <input
                    type="text"
                    name="sp_skill${skill_id}_name"
                    id="sp_skill${skill_id}_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Python Programming"
                />
            </div>
            <div class="md:col-span-1 mt-6">
                <label for="sp_skill${skill_id}_rank">Rank</label>
                <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" name="sp_skill${skill_id}_rank" id="sp_skill${skill_id}_rank">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
           `;
           $('#skill_set').append(new_skill_section);
        });
    }
    
    //click event on the add languages
    {
        $('#add_more_lan').on('click', function() {
            language_id++;
           var new_language_section = `
             <div class="md:col-span-4 mt-6">
                <label for="lan${language_id}_name">Language 1</label>
                <input
                    type="text"
                    name="lan${language_id}_name"
                    id="lan${language_id}_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="English"
                />
            </div>
            <div class="md:col-span-1 mt-6">
                <label for="lan${language_id}_rank">Rank</label>
                <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" name="lan${language_id}_rank" id="lan${language_id}_rank">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
           `;
           $('#language_set').append(new_language_section);
        });
    }
    
    //click event on the add interest
    {
        $('#add_more_int').on('click', function() {
            interest_id++;
           var new_interest_section = `
              <div class="md:col-span-5">
                <input
                    type="text"
                    name="int1"
                    id="int${interest_id}"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="Playing video games"
                />
            </div>
           `;
           $('#interests_details').append(new_interest_section);
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
        var education = [];
        var work_experience = [];
        var projects = [];
        var tech_skills = [];
        var skill_ranking = [];
        var languages = [];
        var interests = [];

        //getting social link in array
        for(var i=1; i<=social_link_id;i++){            
            var type = $(`#social_link${i}_type`).val();
            var value = $(`#social_link${i}_value`).val();
            social_links.push({
                type,
                href: value
            });
        }

        //getting education details in array
        for(var i=1; i<=edu_id;i++){            
            var degree = $(`#edu${i}_degree`).val();
            var university = $(`#edu${i}_university`).val();
            var completed_year = new Date($(`#edu${i}_date`).val()).getFullYear();
            var description = $(`#edu${i}_description`).val();

            education.push({
               degree,
               university,
               completed_year,
               description
            });
        }

        //getting work experience details in array
        for(var i=1; i<=work_ex_id;i++){            
            var org_name = $(`#org${i}_name`).val();
            var designation = $(`#org${i}_designation`).val();
            var description = $(`#org${i}_description`).val();
            var start_date = $(`#org${i}_start_date`).val();
            var end_date = $(`#org${i}_end_date`).val();

            work_experience.push({
                org_name,
                designation,
                description,
                start_date,
                end_date
            });
        }

        //getting projects details in array
        for(var i=1; i<=project_id;i++){            
            var title = $(`#pro${i}_title`).val();
            var date = $(`#pro${i}_date`).val();
            var description = $(`#pro${i}_description`).val();
            var href = $(`#pro${i}_href`).val();

            projects.push({
                title,
                date,
                href,
                description
            });
        }

        //getting tech skills details in array
        for(var i=1; i<=tech_skill_id;i++){            
            var title = $(`#skill${i}_name`).val();
            var description = $(`#skill${i}_description`).val();

            tech_skills.push({
                title,
                description
            });
        }

        //getting skills details in array
        for(var i=1; i<=skill_id;i++){            
            var skill_name = $(`#sp_skill${i}_name`).val();
            var rank = $(`#sp_skill${i}_rank`).val();

            skill_ranking.push({
                skill_name,
                rank
            });
        }

        //getting language details in array
        for(var i=1; i<=language_id;i++){            
            var language = $(`#lan${i}_name`).val();
            var rank = $(`#lan${i}_rank`).val();

            languages.push({
                language,
                rank
            });
        }

        //getting interests details in array
        for(var i=1; i<=interest_id;i++){            
            var interest_name = $(`#int${i}`).val();
            interests.push(interest_name);
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
            },
            education,
            work_experience,
            projects,
            tech_skills,
            skill_ranking,
            languages,
            interests
        };

        // Generate the JWT token
        const token = generateJWT(payload);
        console.log(token);

        // Update the URL with the token parameter
        const url = `${window.location.origin}?token=${token}`;
        window.location.href = url;
    });
});