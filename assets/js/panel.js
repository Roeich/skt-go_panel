$(document).ready(function(){
    $(".search_btn").on("click",function(){
        let bookingCode=$(".search_input").val().trim();
        searchTicket("#manualModal",bookingCode);
    });

    function searchTicket(containerSelector,bookingCode){
        // if booking code match load search item
        if(bookingCode==="7781GV3"){

            // loaded data
            let ticketDetails={
                ticketType: "✨ VIP",
                ticketDate: "20 Jan 2024",
                ticketStatus: "error",
                userName: "Damian Rhino",
                userPhone: "08123456789",
                userEmail: "damian@mail.com",
                userGender: "Male",
            }
    
            // preparing to template
            let {ticketType,ticketDate,ticketStatus,userName,userPhone,userEmail,userGender}= ticketDetails;

            // preparing search item
            let searchItem=`
                <div class="search_item">
                    <div class="d-flex justify-content-between">
                        <div class="pe-2 fw-bold">
                            ${ticketType} Ticket
                        </div>
                        <div>
                            Kode Booking: <b>${bookingCode}</b>
                        </div>
                    </div>
                    <div class="fs_14">
                        <i class="icon icon_calender"></i> ${ticketDate}
                    </div>
                    <div>
                        <div class="fs_14 mb-1">${userName}</div>
                        <div class="fs_12 d-flex flex-wrap">
                            <div class="pe-2 me-2 border-end"><a href="tel:${userPhone}"><i class="icon icon_phone"></i> ${userPhone}</a></div>
                            <div class="pe-2 me-2 border-end"><a href="mailto:${userEmail}"><i class="icon icon_mailbox"></i> ${userEmail}</a></div>
                            <div class="pe-2 me-2 border-end"><i class="icon icon_gender"></i> ${userGender}</div>
                        </div>
                    </div>
                    <div>
                        <div class="alert alert_danger ${ticketStatus=="error"?"":"d-none"}">
                            Tanggal tidak sesuai
                        </div>
                        <div class="alert alert_success ${ticketStatus=="success"?"":"d-none"}">
                            Tiket Valid
                        </div>
                    </div>
                </div>
            `;

            // inserting result items
            $(`${containerSelector} .search_result`).html(searchItem);
            
        }else{
            let notFoundMsg=`<div class="fs_14 c_danger mb_20">😅 Oops, kode booking tidak ditemukan</div>`;
            $(`${containerSelector} .search_result`).html(notFoundMsg);
        }

    }

    // .......... control scanning
    var cameraId;
    const html5QrCode = new Html5Qrcode("reader");

    function openQrScanner() {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                const cameraSelect = $("#cameraSelect");
                cameraSelect.empty();

                let backCamera = devices.find(device => device.label.toLowerCase().includes("back"));
                let frontCamera = devices.find(device => device.label.toLowerCase().includes("front"));

                // Prioritize back camera by default
                cameraId = backCamera ? backCamera.id : devices[0].id;

                devices.forEach((device) => {
                    cameraSelect.append(new Option(device.label, device.id));
                });

                cameraSelect.val(cameraId); // Set the selected camera

                cameraSelect.change(() => {
                    cameraId = cameraSelect.val(); // Update cameraId when selection changes
                    html5QrCode.stop().then(() => {
                        startQrScanner(); 
                    });
                });


                startQrScanner();
            }
        }).catch(err => {
            console.error("Error getting cameras: ", err);
        });
    }

    function startQrScanner() {
        html5QrCode.start(
            cameraId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 } // Bounded box size
                // ,showTorchButtonIfSupported: true
            },
            (decodedText, decodedResult) => {
                html5QrCode.stop();
                $("#offcanvas").offcanvas("hide");
                
                searchTicket("#scanInputModal",decodedText);
                $("#scanInputModal").modal("show");

                // console.log(`Decoded text: ${decodedText}`);
            },
            (errorMessage) => {
                // Ignore errors
            }
        ).catch(err => {
            console.error("Start failed: ", err);
        });
    };

    function powerTorch(powerOn){    
        if(html5QrCode.getState() === Html5QrcodeScannerState.SCANNING || html5QrCode.getState() === Html5QrcodeScannerState.PAUSED){
            html5QrCode.applyVideoConstraints({
                advanced: [{torch: powerOn}]
            });
        }
    };

    $(".open_camera_btn").click(() => {
        openQrScanner();
    });
    $(".stop_scan_btn").click(() => {
        html5QrCode.stop().then(() => {
            console.log("QR scanner stopped.");
        }).catch(err => {
            console.error("Stop failed: ", err);
        });
    });

    let flashlightOn = false; 
    $(".toggle_flashlight_btn").click(() => {
        flashlightOn = !flashlightOn; 
        powerTorch(flashlightOn);
        if(flashlightOn){
            $(".toggle_flashlight_btn").addClass("active");
        }else{
            $(".toggle_flashlight_btn").removeClass("active");
        }
    });
});