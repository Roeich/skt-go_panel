$(document).ready(function(){
    $(".search_btn").on("click",function(){
        let bookingCode=$(".search_input").val().trim();
        searchTicket(bookingCode)
    });

    function searchTicket(bookingCode){
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
            $(".search_result").html(searchItem);
            
        }else{
            let notFoundMsg=`<div class="fs_14 c_danger mb_20">😅 Oops, kode booking tidak ditemukan</div>`;
            $(".search_result").html(notFoundMsg);
        }

    }

    // .......... control scanning
    var cameraId;
    function openQrScanner(){
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                const cId= (devices.length>1)?1:0;
                cameraId = devices[cId].id;
                startQrScanner();
            }
        }).catch(err => {
            console.error("Error getting cameras: ", err);
        });
    }

    const html5QrCode = new Html5Qrcode("reader");
    function startQrScanner() {
        // html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            cameraId, 
            {
                fps: 10,   
                qrbox: { width: 250, height: 250 }  // Bounded box size
            },
            (decodedText, decodedResult) => {
                console.log(`Decoded text: ${decodedText}`);
            },
            (errorMessage) => {
                // Ignore errors
            }
        ).catch(err => {
            console.error("Start failed: ", err);
        });
    };

    $(".open_camera_btn").click(function(){
        openQrScanner();
    });

    $(".stop_scan_btn").click(function(){
        html5QrCode.stop().then((ignore) => {
            // QR Code scanning is stopped.
        }).catch((err) => {
            // Stop failed, handle it.
        });
    });


    // function onScanSuccess(decodedText, decodedResult) {
    //     // handle the scanned code as you like, for example:
    //     console.log(`Code matched = ${decodedText}`, decodedResult);
    //   }
      
    //   function onScanFailure(error) {
    //     // handle scan failure, usually better to ignore and keep scanning.
    //     // for example:
    //     console.warn(`Code scan error = ${error}`);
    //   }
      
    //   let html5QrcodeScanner = new Html5QrcodeScanner(
    //     "reader",
    //     { fps: 10, qrbox: {width: 250, height: 250} },
    //     /* verbose= */ false);
    //   html5QrcodeScanner.render(onScanSuccess, onScanFailure);
})