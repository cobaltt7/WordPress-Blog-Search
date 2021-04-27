function submit() {
	document.getElementById("result").innerHTML =
		"<img src='https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'>";
	fetch(
		document.getElementById("url").value +
			"/wp-json/wp/v2/search?search=" +
			encodeURIComponent(document.getElementById("query").value),
	)
		.then((response) => response.text())
		.then((html) => {
			document.getElementById("result").innerHTML = "";
			var j = 0;
			JSON.parse(html).forEach((element) => {
				fetch(
					document.getElementById("url").value +
						"/wp-json/wp/v2/posts/" +
						element.id,
				)
					.then((response) => response.text())
					.then((html) => {
						document.getElementById(
							"result",
						).innerHTML += `<tr><td class ='odd'>${
							JSON.parse(html).title.rendered
						}</td><td class                                           ='even' id='content${j}'></td><td class ='odd'>${
							JSON.parse(html).content.rendered
						}</td><td class ='even'>${
							JSON.parse(html).date
						}</td></tr>`;
						document.getElementById(
							`content${j}`,
						).innerText = JSON.parse(html).content.rendered;
						j++;
					});
			});
			document.body.innerHTML +=
				"<style>table{border: 5px #000 solid;}</style>";
		});
}
