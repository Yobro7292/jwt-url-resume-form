const star_svg =
  '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="-8.96 -8.96 81.92 81.92" enable-background="new 0 0 64 64" xml:space="preserve" fill="#f49f3e" stroke="#f49f3e" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#f49f3e" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>';
const empty_star =
  '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="-8.96 -8.96 81.92 81.92" enable-background="new 0 0 64 64" xml:space="preserve" fill="#f49f3e" stroke="#f49f3e" stroke-width="5.3759999999999994"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#FFFFFF00" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>';

// Function to get query parameters from URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

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

$(document).ready(function() {
    const token = getQueryParam('token');
    if (token) {
        $('#resume_design').addClass('flex');
        $('#resume_form').addClass('hidden');
        const decoded = decodeJWT(token);
        if (decoded) {
            $('#name_value').text(decoded.name || '');
            $('#role_value').text(decoded.role || '');
            $('#bio_value').text(decoded.bio || '');
            $('#profile_img').attr('src', decoded.image_url || '');

            //setting contect details
            $('#email_value').text(decoded?.contact_details?.email || '');
            $('#phone_value').text(decoded?.contact_details?.phone || '');
            $('#address_value').text(decoded?.contact_details?.address || '');

            // Contect Details Social Media Links
            if (decoded?.contact_details?.social_media?.length > 0) {
                decoded.contact_details.social_media.forEach(function(social) {
                    $('#contact_details').append(`
                        <div class="p-2">${social.type}</div>
                        <div class="col-span-4 col-start-2 w-full bg-white p-2 rounded-md text-blue-600" id="value">
                            <a href="${social.href}" target="_blank">${social.href}</a>
                        </div>
                    `);
                });
            }

            // Work Excperiences
            if (decoded?.work_experience?.length > 0) {
                decoded.work_experience.forEach(function(experience) {
                    $('#work_experience_values').append(`
                        <div class="col-span-5 col-start-1 w-full bg-white p-2 rounded-md flex flex-col gap-[2px]" id="value">
                            <span class="text-xl font-bold">${experience.org_name}</span>
                            <span class="text-md text-gray-600">${experience.designation}</span>
                            <span class="text-sm text-green-600">${experience.start_date} to ${experience.end_date}</span>
                            <span class="text-pretty">${experience.description}</span>
                        </div>
                    `);
                });
            }

            // setting education details
            if (decoded?.education?.length > 0) {
                decoded.education.forEach(function(experience) {
                    $('#education_values').append(`
                        <div class="col-span-5 col-start-1 w-full bg-white p-2 rounded-md flex flex-col gap-[2px]" id="value">
                            <span class="text-xl font-bold">${experience.title}</span>
                            <span class="text-md text-gray-600">${experience.school}</span>
                            <span class="text-sm text-green-600">${experience.completed_year || ""}</span>
                            <span class="text-pretty">${experience.description}</span>
                        </div>
                    `);
                });
            }

            // setting skill ranking
            if (decoded?.skill_ranking?.length > 0) {
                decoded.skill_ranking.forEach(function(skill) {

                    let filled_stars = '';
                    let empty_stars = '';
                    for (let index = 0; index < skill.rank; index++) {
                        filled_stars += star_svg;
                    }
                    if(skill.rank<5){
                        for (let index = 0; index < (5-skill.rank); index++) {
                            empty_stars += empty_star;
                        }
                    }

                    $('#skill_ranking_values').append(`
                        <div class="p-2">${skill.skill_name}</div>
                        <div class="col-span-4 col-start-2 w-full bg-white p-4 rounded-md text-blue-600 flex items-center" id="value">
                        ${filled_stars}${empty_stars}
                        </div>
                    `);
                });
            }

        } //end_decode_if

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
                    if(Image_URL){
                        console.log(Image_URL);
                    }
                }, 4000);
                // Add the image to the PDF at the center
                // pdf.addImage(canvas.toDataURL('image/png'), 'PNG', offsetX, offsetY, imgWidth, imgHeight);
        
                // Save the PDF
                // pdf.save('generated.pdf');
            }).catch(err => {
                console.error("Error generating PDF: ", err);
            });
        });
        
        

        
    } 
    else {
        $('#resume_design').addClass('hidden');
        $('#resume_form').addClass('flex');
    }
});
