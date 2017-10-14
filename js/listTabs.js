function viewTab(evt, tab) {
    // Declare all variables
    var i, tabcontent, tablink;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
		tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }

    // Get all elements with class="tablink" and remove the class "active"
	tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
	document.getElementById(tab).className += " active";
    evt.currentTarget.className += " active";
}