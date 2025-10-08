async function includeHTML(id, file) {
    const element = document.getElementById(id);
	// Check cache (localStorage)
	const cached = localStorage.getItem(file);
    if (cached) {
		element.innerHTML = cached;
		// Fetch in background to update cache
		fetch(file)
			.then(response => response.text())
			.then(html => localStorage.setItem(file, html));
		return;
	}

	// First load
	const response = await fetch(file);
	const html = await response.text();
	element.innerHTML = html;
	localStorage.setItem(file, html);
}

//const response = await fetch(file);
//element.innerHTML = await response.text();

async function init() {
      await Promise.all([
        includeHTML("header", "header.html")
        //includeHTML("footer", "footer.html")
      ]);
      document.body.classList.add("loaded"); // Reveal only when ready
}

includeHTML("header", "header.html");

//includeHTML("header", "header.html");