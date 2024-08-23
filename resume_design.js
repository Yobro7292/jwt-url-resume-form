const star_svg =
  '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="-8.96 -8.96 81.92 81.92" enable-background="new 0 0 64 64" xml:space="preserve" fill="#f49f3e" stroke="#f49f3e" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#f49f3e" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>';
const empty_star =
  '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="-8.96 -8.96 81.92 81.92" enable-background="new 0 0 64 64" xml:space="preserve" fill="#f49f3e" stroke="#f49f3e" stroke-width="5.3759999999999994"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#FFFFFF00" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>';

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
    const token = window.location.hash.substring(1);

    if (token) {
        // showing design
        $('#resume_design').addClass('flex');
        $('#resume_form').addClass('hidden');
        $('#generate-pdf').show().addClass('flex');

        const decoded = decodeJWT(token);
        console.log("Decoded token", decoded);
        if (decoded) {
            $('#profile_image').css('background-image', decoded.image_url ? `url(${decoded.image_url})` : "linear-gradient(to left top, #d3d3d3, #b6b6b6, #9a9a9a, #7f7f7f, #656565)");
            $('#name_v').text(decoded.name || "");
            $('#role_v').text(decoded.role || "");
            $('#bio_v').text(decoded.bio || "");
            $('#address_v').text(decoded.contact_details.address || "");
            $('#email_v').text(decoded.contact_details.email || "");
            $('#phone_v').text(decoded.contact_details.phone || "");

            // Adding social links in the design 
            const social_links = decoded.contact_details.social_links || [];
            var social_links_output_dom = "";
            if(social_links.length > 0){
                social_links.forEach(link => {
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
            }

            //add Work experience in design
            const work_experience = decoded.work_experience || [];
            var work_experience_output_dom = "";
            if(work_experience.length > 0){
                work_experience.forEach(work => {
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

        $('#go_back').click(function(){
            window.location.href = window.location.origin;
        });
        
    } 
    else {
        $('#resume_design').addClass('hidden');
        $('#resume_form').addClass('flex');
        $('#generate-pdf').hide().removeClass('flex');
    }
});
