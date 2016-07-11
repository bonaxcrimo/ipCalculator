$(document).ready(function () {
    var per = 0;

    function cekIP(ip) {
        ip = ip.split(".");
        var betul = true;
        if (ip.length != 4)
            betul = false;
        else {
            for (var i = 0; i < ip.length; i++) {
                if (parseInt(ip[i]) >= 0 && parseInt(ip[i]) <= 255) {
                    for (var j = 0; j < ip[i].length; j++) {
                        if (parseInt(ip[i][j]) >= 0 && parseInt(ip[i][j]) <= 255) {
                            betul = true;
                        } else {
                            betul = false;
                            break;
                        }
                    }
                    if (betul == false)
                        break;
                } else {
                    betul = false;
                    break;
                }
            }

        }
        return betul;
    }
    $("#kirim").click(function () {
        if (cekIP($("#ip").val()) == false) {
            $("#main .cal").toggleClass("shake");
            $("input#ip").addClass("error");
            $("p.help.satu").html("Wrong Format");
            $("p.help.satu").removeClass("abu").addClass("red");
            $("#main .hasil").removeClass("removeMargin");
            $("#main .cal .form").removeClass("shadow");

        } else {
            $("input#ip").removeClass("error");
            $("p.help.satu").html("Example: 192.168.0.0");
            $("p.help.satu").removeClass("red").addClass("abu");
            $("#main .hasil").addClass("removeMargin");
            $("#main .cal .form").addClass("shadow");


            /*IP*/
            var ip = $("#ip").val();

            ip = ip.split(".");

            function jadiInt(arr) {
                for (var i = 0; i < arr.length; i++)
                    arr[i] = parseInt(arr[i]);
                return arr;
            }
            ip = jadiInt(ip);
            var listIP = [8, 16, 24, 32];
            var dns = [255, 255, 255, 255];
            var daftarBiner = [0, 1, 3, 7, 15, 31, 63, 127, 255];
            var wildCard = [0, 0, 0, 0];
            var indexDnsNsisaL = [];

            function cariAntara(n) {
                var an = 0;
                var arr = [];
                var index = 0;
                for (var i = 0; i < listIP.length; i++) {
                    if (listIP[i] > n) {
                        arr.push(listIP[i] - n);
                        arr.push(index);
                    }
                    index++;
                }
                return arr;
            }
            var sisa = cariAntara(per)[0];
            /*DNS*/
            var indexDns = cariAntara(per)[1];

            function cariDns(index) {
                for (var i = 0; i < dns.length; i++) {
                    if (i > index)
                        dns[i] = 0;
                    else if (i == index)
                        dns[i] = dns[i] - daftarBiner[sisa];
                }
            }
            cariDns(indexDns);
            var dnsHasil = "";

            function cetak(arr) {
                var hasil = "";
                for (var i = 0; i < arr.length; i++) {
                    hasil += arr[i];
                    i < arr.length - 1 ? hasil += "." : "";
                }
                return hasil;
            }
            dnsHasil = cetak(dns);
            $("#dnsHasil").html(dnsHasil);

            $("#network").html(cetak(ip));
            var firstHost = ip;
            firstHost[3] += 1;

            $("#firstHost").html(cetak(firstHost));
            /*Broadcast*/
            function cariBroadcast() {
                for (var i = 0; i < ip.length; i++) {
                    if (i > indexDns)
                        ip[i] = 255;
                    else if (i == indexDns)
                        ip[i] = ip[i] + daftarBiner[sisa];
                }
            }
            cariBroadcast();
            ip[3] -= 1;
            $("#broadcast").html(cetak(ip));
            var lastHost = ip;
            lastHost[3] -= 1;
            $("#lastHost").html(cetak(lastHost));
            /*WildCard*/
            function cariWildCard() {
                for (var i = 0; i < wildCard.length; i++)
                    wildCard[i] = Math.abs(dns[i] - 255);
            }
            cariWildCard();
            $("#wildCard").html(cetak(wildCard));
        }
    });

    $("span#kanan").click(function () {
        $("#main .hasil").removeClass("removeMargin");
        $("#main .cal .form").removeClass("shadow");
    });
    $("#slider-Per").slider({
        range: "max"
        , min: 1
        , max: 30
        , value: 1
        , slide: function (event, ui) {
            $("#amount").html(ui.value);
            per = ui.value;
        }
    });
    $("#amount").val($("#slider-Per").slider("value"));



});
