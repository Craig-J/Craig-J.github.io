$(document).ready(function () {
        GetLatestReleaseInfo();
    });

    function GetLatestReleaseInfo() {
        $.getJSON("https://api.github.com/repos/Craig-J/RhythMIR/releases").done(function (releases) {
            var asset = releases[0].assets[0];
            var download_size_text = "(" + (asset.size / (1024 * 1024)).toLocaleString() + "MB)";
            $(".rhythmir_download").attr("href", asset.browser_download_url);
            $(".rhythmir_download_size").text(download_size_text);
        });
    }