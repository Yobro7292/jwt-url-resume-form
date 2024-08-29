const filled_box = '<div class="w-full p-c-b rounded-sm"></div>';
const empty_box = '<div class="bg-gray-200 rounded-sm"></div>';
const API_endpoint_host = 'https://www.yogihariyani.in';

// Function to decode JWT token
function decodeJWT(token) {
  try {
    return KJUR.jws.JWS.parse(token).payloadObj;
  } catch (e) {
    console.error("Invalid token");
    alert("Invalid token");
    window.location.href = window.location.origin;
    return null;
  }
}

// Function to generate JWT token
function generateJWT(payload) {
    const header = { alg: "HS256", typ: "JWT" };
    const secret = "yyu";
    const sHeader = JSON.stringify(header);
    const sPayload = JSON.stringify(payload);
    const token = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, { utf8: secret });
  
    return token;
}

function cleanURL(url) {
    const cleanedURL = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanedURL;
}


// Merge data function
function mergeData(existingData, apiData) {
    return existingData.map(existingItem => {
        const apiItem = apiData.find(item => item.id === existingItem.id);
        if (apiItem) {
            return {
                ...existingItem,
                ...apiItem
            };
        }
        return existingItem;
    });
}

// function for adding social_links in design 
function addSocialLinks(data){
    $('#social_links_v_container').html("");
    const social_links_value = data || [];
            var social_links_output_dom = "";
            if(social_links_value.length > 0){
                social_links_value.forEach(link => {
                    if(link.type == "linkedin"){
                        social_links_output_dom += `
                            <div class="flex justify-end items-center gap-1">
                                <span class="text-white text-[12px] font-light">${link.href}</span>
                                <div class="min-w-[20px] p-0 flex justify-end items-center"><i class="fa-brands fa-linkedin s-c-f fa-sm"></i></div>
                            </div>
                        `;
                    }
                    else if(link.type == "instagram"){
                        social_links_output_dom += `
                            <div class="flex justify-end items-center gap-1">
                                <span class="text-white text-[12px] font-light">${link.href}</span>
                                <div class="min-w-[20px] p-0 flex justify-end items-center"><i class="fa-brands fa-instagram s-c-f fa-sm"></i></div>
                            </div>
                        `;
                    }
                    else if(link.type == "website"){
                        social_links_output_dom += `
                            <div class="flex justify-end items-center gap-1">
                                <span class="text-white text-[12px] font-light">${link.href}</span>
                                <div class="min-w-[20px] p-0 flex justify-end items-center"><i class="fa-solid fa-globe s-c-f fa-sm"></i></div>
                            </div>
                        `;
                    }
                    else if(link.type == "twitter"){
                        social_links_output_dom += `
                            <div class="flex justify-end items-center gap-1">
                                <span class="text-white text-[12px] font-light">${link.href}</span>
                                <div class="min-w-[20px] p-0 flex justify-end items-center"><i class="fa-brands fa-square-twitter s-c-f fa-sm"></i></div>
                            </div>
                        `;
                    } else {
                        social_links_output_dom += "";
                    }
                });
                $('#social_links_v_container').append(social_links_output_dom);
            } else {
                $('#social_links_v_container').hide();
            }
}

// function for adding work_experience
function addWorkExperience(data){
    $('#work_experience_v_container').html("");
    const work_experience_value = data || [];
    var work_experience_output_dom = "";
    if(work_experience_value.length > 0){
        work_experience_value.forEach(work => {
            work_experience_output_dom += `
                <div class="flex w-full justify-start items-start gap-1">
                    <div class="rounded-full min-w-[8px] min-h-[8px] p-c-b mt-[10px]"></div>
                    <div class="flex flex-col gap-[4px]">
                        <span class="text-lg font-bold p-c-f">${work.designation}</span>
                        <span class="text-md p-c-f -mt-1">${work.org_name}</span>
                        <span class="text-xs s-c-f">${work.start_date} - ${work.end_date}</span>
                        <p class="text-xs text-black indent-3.5 text-justify">${work.description}</p>
                    </div>
                </div>
            `;
        });
        $('#work_experience_v_container').append(work_experience_output_dom);
    }else{
        $('#work_c').hide();
    }
}

// function for adding education
function addEducation(data){
    $('#education_v_container').html("");
    const education_value = data || [];
    var education_output_dom = "";
    if(education_value.length > 0){
        education_value.forEach(edu => {
            education_output_dom += `
                <div class="flex w-full justify-start items-start gap-2">
                    <div class="rounded-full min-w-[8px] min-h-[8px] p-c-b mt-[10px]"></div>
                    <div class="flex flex-col gap-[4px]">
                        <span class="text-lg font-bold p-c-f">${edu.degree}</span>
                        <span class="text-md p-c-f -mt-1">${edu.university} <span class="s-c-f ml-1">- ${edu.completed_year}</span></span>
                        <p class="text-xs text-black indent-3.5 text-justify">${edu.description}</p>
                    </div>
                </div>
            `;
        });
        $('#education_v_container').append(education_output_dom);
    }else{
        $('#education_c').hide();
    }
} 

// function for adding skill ranking 
function addSkillRanking(data){
    $('#skill_ranking_v_container').html("");
    const skill_ranking_value = data || [];
    var skill_ranking_output_dom = "";
    if(skill_ranking_value.length > 0){
        skill_ranking_value.forEach(skill => {
            skill_ranking_output_dom += `
                <span class="text-sm text-black">${skill.skill_name}</span>
                <div class="grid grid-cols-5 gap-x-2 h-[18px]">
            `;
                for(var i=0; i<skill.rank;i++){
                    skill_ranking_output_dom += filled_box;
                }
                if(skill.rank<5){
                    for(var j=0; j<5-skill.rank;j++){
                        skill_ranking_output_dom += empty_box;
                    }
                }
            skill_ranking_output_dom += '</div>';
        });
        $('#skill_ranking_v_container').append(skill_ranking_output_dom);
    }else{
        $('#skill_rank_c').hide();
    }
}

// function for adding personal projects
function addPersonalProjects(data){
    $('#projects_v_container').html("");
    const projects_value = data || [];
    var project_output_dom = "";
    if(projects_value.length > 0){
        projects_value.forEach(pro => {
            project_output_dom += `
                <div class="flex w-full justify-start items-start gap-1">
                    <div class="rounded-full min-w-[8px] min-h-[8px] p-c-b mt-[4px]"></div>
                    <div class="flex flex-col gap-[4px]">
                        <span class="text-md p-c-f -mt-1">
                                ${pro.title}
                            <span class="text-xs s-c-f ml-1">
                                ${pro.date} 
                            <a href="${pro.href}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square fa-sm s-c-f ml-1 cursor-pointer"></i></a>
                            </span>
                        </span>
                        <p class="text-xs text-black indent-3.5 text-justify">${pro.description}</p>
                    </div>
                </div>
            `;
        });
        $('#projects_v_container').append(project_output_dom);
    }else{
        $('#projects_c').hide();
    }
}

// function for adding tech skills
function addTechSkill(data){
    $('#tech_skills_v_container').html("");
    const tech_skills_value = data || [];
    var tech_skills_output_dom = "";
    if(tech_skills_value.length > 0){
        tech_skills_value.forEach(techSkill => {
            tech_skills_output_dom += `
                <div class="flex flex-col gap-[4px]">
                    <span class="text-sm p-c-f font-semibold">${techSkill.title}</span>
                    <p class="text-xs text-black text-justify">${techSkill.description}</p>
                </div>
            `;
        });
        $('#tech_skills_v_container').append(tech_skills_output_dom);
    }else{
        $('#tech_skills_c').hide();
    }
}

// function for adding languages
function addLanguages(data){
    $('#language_output_v_container').html("");
    const languages_value = data || [];
    var language_output_dom = "";
    if(languages_value.length > 0){
        languages_value.forEach(lan => {
            language_output_dom += `
                    <span class="text-sm text-black">${lan.language}</span>
                    <div class="grid grid-cols-5 gap-x-2 h-[18px]">
            `;
                for(var i=0; i<lan.rank;i++){
                    language_output_dom += filled_box;
                }
                if(lan.rank<5){
                    for(var j=0; j<5-lan.rank;j++){
                        language_output_dom += empty_box;
                    }
                }
            language_output_dom += '</div>';
        });
        $('#language_output_v_container').append(language_output_dom);
    }else{
        $('#language_c').hide();
    }
}

// function for adding interests
function addInterests(data){
    $('#interest_v_container').html("");
    const interests_value = data || [];
    var interests_output_dom = "";
    if(interests_value.length > 0){
        interests_value.forEach(interest => {
            interests_output_dom += `
                <div class="px-2 min-h-[25px] border border-[#183141] rounded-md flex justify-center items-center text-sm w-fit"><span class="my-2">${interest}</span></div>
            `;
        });
        $('#interest_v_container').append(interests_output_dom);
    }else{
        $('#interests_c').hide();
    }
}

// function to regenerate new token 
function generatingTokenAndRedirect(decoded, rewrited_data){
    const payload = {
        name: decoded.name,
        role: rewrited_data.role || decoded.role,
        bio: rewrited_data.bio || decoded.bio,
        image_url: decoded.image_url,
        contact_details: {
            email: decoded.contact_details.email,
            phone: decoded.contact_details.phone,
            address: decoded.contact_details.address,
            social_links: decoded.contact_details.social_links
        },
        education: mergeData(decoded.education, rewrited_data?.education) || decoded.education,
        work_experience: mergeData(decoded.work_experience, rewrited_data?.work_experience) || decoded.work_experience,
        projects: mergeData(decoded.projects, rewrited_data?.projects) || decoded.projects,
        tech_skills: mergeData(decoded.tech_skills, rewrited_data?.tech_skills) || decoded.tech_skills,
        skill_ranking: decoded.skill_ranking,
        languages: decoded.languages,
        interests: decoded.interests,
        rewrited: true
    };

    // Generate the JWT token
    const token = generateJWT(payload);

    // Set the fragment identifier (hash)
    window.location.hash = token;  // Sets the fragment as the JWT token

    // var currentPathWithHostname = window.location.href;
    window.location.reload();
}
$(document).ready(function() {
    const token = window.location.hash.substring(1);

    // variables
    var image_url = "";
    var social_link_id = 1;
    var edu_id = 1;
    var work_ex_id = 1;
    var project_id = 1;
    var tech_skill_id = 1; 
    var skill_id = 1;
    var language_id = 1;
    var interest_id = 1;
    

    if (token) {
        // showing design
        $('#resume_design').addClass('flex');
        $('#resume_form').addClass('hidden');
        $('#generate-pdf').show().addClass('flex');
        $('#rewrite-btn').show().addClass('flex');
        
        $('#copy_token').attr('value',window.location.href);
        $('#copy_token_btn').click(function () {
            const token = $('#copy_token').val() || window.location.href;
            navigator.clipboard.writeText(token).then(function() {
                $('#toast').removeClass('hidden').fadeIn(300);
                // Hide the toast after 3 seconds
                setTimeout(function() {
                    $('#toast').fadeOut(1000, function() {
                        $(this).addClass('hidden');
                    });
                }, 3000);
            }).catch(function(err) {
                console.error('Failed to copy text: ', err);
            });
        });

        const decoded = decodeJWT(token);
        if (decoded) {
            $('#profile_image').css('background-image', decoded.image_url ? `url(${decoded.image_url})` : "linear-gradient(to left top, #d3d3d3, #b6b6b6, #9a9a9a, #7f7f7f, #656565)");
            $('#name_v').text(decoded.name || "");
            $('#role_v').text(decoded.role || "");
            $('#bio_v').text(decoded.bio || "");
            $('#address_v').text(decoded.contact_details.address || "");
            $('#email_v').text(decoded.contact_details.email || "");
            $('#phone_v').text(decoded.contact_details.phone || "");

            let social_links_value = decoded.contact_details.social_links || [];
            let work_experience_value = decoded.work_experience || [];
            let education_value = decoded.education || [];
            let projects_value = decoded.projects || [];
            let skill_ranking_value = decoded.skill_ranking || [];
            let tech_skills_value = decoded.tech_skills || [];
            let languages_value = decoded.languages || [];
            let interests_value = decoded.interests || [];

            // Adding social links in the design 
            addSocialLinks(social_links_value);

            //add Work experience in design
            addWorkExperience(work_experience_value);

            //add education in design
            addEducation(education_value);

            //add skill ranking in design
            addSkillRanking(skill_ranking_value);

            //add personal projects in design
            addPersonalProjects(projects_value);

            //add tech skills in design
            addTechSkill(tech_skills_value);

            //add language in design
            addLanguages(languages_value);

            //add interests in design
            addInterests(interests_value); 

            // showing popup for AI writing
            setTimeout(function() {
                if(!decoded.rewrited){
                    $("#ai-popup").removeClass("hidden").hide().fadeIn(500);
                }
            }, 3000);
            
            $('#ai-popup-close').click(function(){
                $("#ai-popup").fadeOut(500);
            })

            // click on rewrite-btn
            $('#rewrite-btn').click(function(){
                $("#ai-popup").fadeOut(500);
                if(!decoded.rewrited){
                    $("#loading-spinner").removeClass("hidden");

                    // preparing a payload 
                    let resume_data = {
                        role: decoded.role,
                        bio: decoded.bio,
                    }

                    if(work_experience_value.length > 0){
                        let work_ex = [];
                        work_experience_value.forEach(work => {
                            work_ex.push({
                                org_name: work.org_name,
                                designation: work.designation,
                                description: work.description,
                                id: work.id
                            })
                        });
                        resume_data = {
                            ...resume_data,
                            work_experience: work_ex
                        }
                    }

                    if(education_value.length > 0){
                        let education_ex = [];
                        education_value.forEach(edu => {
                            education_ex.push({
                                degree: edu.degree,
                                description: edu.description,
                                id: edu.id
                            })
                        });
                        resume_data = {
                            ...resume_data,
                            education: education_ex
                        }
                    }

                    if(projects_value.length > 0){
                        let projects_ex = [];
                        projects_value.forEach(pro => {
                            projects_ex.push({
                                title: pro.title,
                                description: pro.description,
                                id: pro.id
                            })
                        });
                        resume_data = {
                            ...resume_data,
                            projects: projects_ex
                        }
                    }

                    if(tech_skills_value.length > 0){
                        let tech_skills_ex = [];
                        tech_skills_value.forEach(skill => {
                            tech_skills_ex.push({
                                title: skill.title,
                                description: skill.description,
                                id: skill.id
                            })
                        });
                        resume_data = {
                            ...resume_data,
                            tech_skills: tech_skills_ex
                        }
                    }

                    $.ajax({
                        url: `${API_endpoint_host}/api/resume`,  
                        method: 'POST',                          
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },        
                        data: JSON.stringify({ resume_data }),   
                        success: function(response) {  
                            if(response && response.success == true){
                                const rewrited_data = response.data;
                                $('#bio_v').text(rewrited_data?.bio || decoded.bio);
                                $('#role_v').text(rewrited_data?.role || decoded.role);
                                if(rewrited_data?.education){
                                    const mergedData = mergeData(education_value, rewrited_data?.education);
                                    addEducation(mergedData || education_value);
                                }
                                if(rewrited_data?.tech_skills){
                                    const mergedData = mergeData(tech_skills_value, rewrited_data?.tech_skills) 
                                    addTechSkill(mergedData || tech_skills_value);

                                }
                                if(rewrited_data?.projects){
                                    const mergedData = mergeData(projects_value, rewrited_data?.projects) 
                                    addPersonalProjects(mergedData || projects_value);

                                }
                                if(rewrited_data?.work_experience){
                                    const mergedData = mergeData(work_experience_value, rewrited_data?.work_experience) 
                                    addWorkExperience(mergedData || work_experience_value);

                                }

                                $('#rewrite-btn').hide();
                                generatingTokenAndRedirect(decoded, rewrited_data);
                            } else {
                                alert("Something went wrong in server");
                            }
                            $("#loading-spinner").addClass("hidden");
                        },
                        error: function(error) {
                            console.error('Error:', error); 
                            alert("Something went wrong in server");
                            $("#loading-spinner").addClass("hidden");
                        }
                    });
                } else {
                    alert("You already rewrited with AI");
                }
            });

        } //end_decode_if


        // generate pdf and download
        $('#generate-pdf').click(function () {
            // Capture the content as a canvas
            html2canvas(document.querySelector("#content_to_pdf"), {
                scale: 2,  // Increase scale for better quality
                useCORS: true,  // Enable CORS to handle cross-origin images
                allowTaint: true  // Allows images from different origins without tainting the canvas
            }).then(canvas => {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4
        
                // Calculate the A4 size in pixels at 96 DPI
                const a4Width = 210; // A4 width in mm
                const a4Height = 297; // A4 height in mm
        
                // Get canvas dimensions in pixels
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height+100;
        
                // Calculate the aspect ratio
                const ratio = Math.min(a4Width / canvasWidth, a4Height / canvasHeight);
        
                // Calculate the new dimensions for the image in mm
                const imgWidth = (canvasWidth) * ratio; // px to mm conversion (1 px = 0.264583 mm)
                const imgHeight = (canvasHeight) * ratio;
        
                // Center the image if it's smaller than the A4 page
                const offsetX = (a4Width - imgWidth) / 2;
                const offsetY = (a4Height - imgHeight) / 2;
                
                setTimeout(() => {
                    const Image_URL = canvas.toDataURL('image/png');
                }, 4000);
                // Add the image to the PDF at the center
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', offsetX, offsetY, imgWidth, imgHeight);
        
                // Save the PDF
                pdf.save('generated.pdf');
            }).catch(err => {
                console.error("Error generating PDF: ", err);
            });
        });
        
    } 
    else {
        $('#resume_design').addClass('hidden');
        $('#resume_form').addClass('flex');
        $('#generate-pdf').hide().removeClass('flex');
        $('#rewrite-btn').hide().removeClass('flex');

        $('#start').click(function () {
            $('#step1').removeClass('hidden').hide();
            $('#step1').fadeIn(300);
        });

        $('#cancel1').click(function () {
            $(`#step1`).fadeOut(300);
        });

        $('#next1').click(function () {
            $('#step1').fadeOut(300);
            $('#step2').removeClass('hidden').hide();
            $('#step2').fadeIn(300);
        });

        $('#cancel2').click(function () {
            $(`#step2`).fadeOut(300);
        });

        $('#next2').click(function () {
            $('#step2').fadeOut(300);
            $('#step3').removeClass('hidden').hide();
            $('#step3').fadeIn(300);
        });

        $('#cancel3').click(function () {
            $(`#step3`).fadeOut(300);
        });

        $('#next3').click(function () {
            $('#step3').fadeOut(300);
            $('#step4').removeClass('hidden').hide();
            $('#step4').fadeIn(300);
        });

        $('#cancel4').click(function () {
            $(`#step4`).fadeOut(300);
        });

        $('#next4').click(function () {
            $('#step4').fadeOut(300);
            $('#step5').removeClass('hidden').hide();
            $('#step5').fadeIn(300);
        });

        $('#cancel5').click(function () {
            $(`#step5`).fadeOut(300);
        });

        $('#next5').click(function () {
            $('#step5').fadeOut(300);
            $('#step6').removeClass('hidden').hide();
            $('#step6').fadeIn(300);
        });

        $('#cancel6').click(function () {
            $(`#step6`).fadeOut(300);
        });

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

        // Function for processing the file
        function processFile(file) {
            const maxFileSize = 200 * 1024; // 200kb in bytes

            // Check if the file exceeds 200kb
            if (file.size > maxFileSize) {
                alert('File size exceeds 200kb. Please select a smaller file.');
                return;
            }

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

        // Getting profile image data URL
        {
            toggleUploadButton();
            $('#file-upload').on('change', function(event) {
                const file = event.target.files[0];
                processFile(file);
            });
        }

        // Handling drag and drop functionality
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
            if(social_link_id>2){
                $('#add_more_links').hide();
            }
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
            $(`#step6`).fadeOut(300);
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
                if(type && href){
                    social_links.push({
                        type,
                        href: cleanURL(value),
                        id: i
                    });
                }
            }

            //getting education details in array
            for(var i=1; i<=edu_id;i++){            
                var degree = $(`#edu${i}_degree`).val();
                var university = $(`#edu${i}_university`).val();
                var completed_year = new Date($(`#edu${i}_date`).val()).getFullYear() || "";
                var description = $(`#edu${i}_description`).val();
                if(degree && university && completed_year){
                    education.push({
                        degree,
                        university,
                        completed_year,
                        description,
                        id: i
                    });
                }
            }

            //getting work experience details in array
            for(var i=1; i<=work_ex_id;i++){            
                var org_name = $(`#org${i}_name`).val();
                var designation = $(`#org${i}_designation`).val();
                var description = $(`#org${i}_description`).val();
                var start_date = $(`#org${i}_start_date`).val() || "";
                var end_date = $(`#org${i}_end_date`).val() || "";

                if(org_name && designation){
                    work_experience.push({
                        org_name,
                        designation,
                        description,
                        start_date,
                        end_date,
                        id: i
                    });
                }
            }

            //getting projects details in array
            for(var i=1; i<=project_id;i++){            
                var title = $(`#pro${i}_title`).val();
                var date = $(`#pro${i}_date`).val();
                var description = $(`#pro${i}_description`).val() || "";
                var href = $(`#pro${i}_href`).val() || "";

                if(title && date){
                    projects.push({
                        title,
                        date,
                        href,
                        description,
                        id: i
                    });
                }
            }

            //getting tech skills details in array
            for(var i=1; i<=tech_skill_id;i++){            
                var title = $(`#skill${i}_name`).val();
                var description = $(`#skill${i}_description`).val() || "";

                if(title){
                    tech_skills.push({
                        title,
                        description,
                        id: i
                    });
                }
            }

            //getting skills details in array
            for(var i=1; i<=skill_id;i++){            
                var skill_name = $(`#sp_skill${i}_name`).val();
                var rank = $(`#sp_skill${i}_rank`).val() || 0;

                if(skill_name){
                    skill_ranking.push({
                        skill_name,
                        rank,
                        id: i
                    });
                }
            }

            //getting language details in array
            for(var i=1; i<=language_id;i++){            
                var language = $(`#lan${i}_name`).val();
                var rank = $(`#lan${i}_rank`).val() || "";

                if(language){
                    languages.push({
                        language,
                        rank,
                        id: i
                    });
                }
            }

            //getting interests details in array
            for(var i=1; i<=interest_id;i++){            
                var interest_name = $(`#int${i}`).val();
                if(interest_name){
                    interests.push(interest_name);
                }
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
                interests,
                rewrited: false
            };

            // Generate the JWT token
            const token = generateJWT(payload);

            // Set the fragment identifier (hash)
            window.location.hash = token;  // Sets the fragment as the JWT token

            // var currentPathWithHostname = window.location.href;
            window.location.reload();
        });
    }
});
