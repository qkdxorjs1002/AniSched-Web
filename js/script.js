const anilistUrl= "https://www.anissia.net/anitime/list.js?w=";
const anicapUrl = "https://www.anissia.net/anitime/cap.js?i=";
const thumbUrl = "http://test.istpikworld.net/~anisched/";
const namuGo = "https://namu.wiki/go/";

var day = ['ìí', 'êÅ', 'ûý', 'â©', 'ÙÊ', 'ÑÑ', '÷Ï', 'èâ', 'ãæ'];
var targetId = "";

function init() {
	var today = new Date();
	var temp = '';
	document.getElementById("menu").style.display = "none";
	
	for (var i = 0; i < day.length; i++) {
		temp += "<tr><td><div class=day onClick=\"httpGet(\'" + anilistUrl + "\'," + i + "); document.getElementById(\'header\').innerHTML = \'AniSched - " + day[i] +"\';\">" + day[i] + "</div></td></tr>";
	}
	document.getElementById("tab").innerHTML += "<table class=sel_day>"+ temp +"</table>";
	
	httpGet(anilistUrl, today.getDay());
	document.getElementById("header").innerHTML = "AniSched - " + day[today.getDay()];
}

function httpGetBase(targetUrl, id) {
	var script = document.createElement("script");
	
	script.type = "text/javascript";
	script.src = targetUrl + id;
	targetId = id;
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

function httpGet(targetUrl, id, title, genre, link, start_d, ed_d) {
	httpGetBase(targetUrl, id);
	document.getElementById("captitle").innerHTML = "<a href=\'" + namuGo + title + "\' target=\'_blank\'><img id=\'namu\' src=\'/img/namu.png\'></a>" + title;
	document.getElementById("description").innerHTML = "<div id=\'inform\'>Àå¸£: " + genre + "<br>³¯Â¥: " + start_d + " ~ " + ed_d + "<br>È¨ÆäÀÌÁö: " + link + "</div>";
}

function anitimeJson(data) {	
	listDrawer(data);
}

function listDrawer(targetData) {
	var date = new Date();
	var today = (date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate();
	var randn = Math.random() * 40;

	if (targetData.length === 0) {
		try {
			document.getElementById("thumbnail").remove();
		} catch (Exception) {}
		document.getElementById("image").innerHTML 
			+= "<img id='thumbnail' src='" + thumbUrl + targetId + ".jpg' onerror='this.src=\"" + thumbUrl + "rand" + randn.toFixed() + ".png\"" + "'>";
		
		document.getElementById("caption").innerHTML 
			= "<div class=item-cap><table><tr><td>¸ñ·Ï ¾øÀ½</td></tr></table></div>";
		
		document.getElementById("overlay").style.display = "block";
	} else if (targetData[0].n === undefined) {
		var item_new = "",
			item_ip = "",
			item_old = "";
		
		for (var i = 0; i < targetData.length; i++) {
			try {
				var id = targetData[i].i,
					title = targetData[i].s,
					time = targetData[i].t,
					genre = targetData[i].g,
					link = targetData[i].l,
					able = targetData[i].a,
					start_d = targetData[i].sd,
					ed_d = targetData[i].ed,
					style = "",
					tag = "ip";
				
				if (today < start_d) {
					style = "style=\"background-color:#DDDDFF\" ";
					tag = "new";
				} else if (ed_d != 0 && today >= ed_d) {
					style = "style=\"background-color:#DDDDDD;\" ";
					tag = "old";
				}
				if (able === false) {
					style = "style=\"background-color:#FFDDDD;\" ";
				}

				start_d = start_d.substr(0,4) + "/" + start_d.substr(4,2) + "/" + start_d.substr(6,2);
				ed_d = ed_d.substr(0,4) + "/" + ed_d.substr(4,2) + "/" + ed_d.substr(6,2);
			} catch (Exception) { }
			var temp = "<div id=" + id + " class=item " + style + "alink=" + link 
				+ " onClick=\"httpGet(\'" + anicapUrl + "\'," + id + ",\'" + title + "\',\'" + genre + "\',\'" + link + "\',\'" + start_d + "\',\'" + ed_d + "\');\"><table><tr><td>" 
				+ title + "</td></tr><tr><td>&nbsp" 
				+ time.substring(0,2) + ":" + time.substring(2,4) + " - " + genre
				+ "</td></tr></table></div>";
			
			if (tag === "new") {
				item_new += temp;
			} else if (tag === "old") {
				item_old += temp;
			} else {
				item_ip += temp;
			}
		}
		document.getElementById("list").innerHTML = item_ip + item_new + item_old;
	} else {
		document.getElementById("caption").innerHTML = null;
		try {
			document.getElementById("thumbnail").remove();
		} catch (Exception) {}
		document.getElementById("image").innerHTML 
			+= "<img id='thumbnail' src='" + thumbUrl + targetId + ".jpg' onerror='this.src=\"" + thumbUrl + "rand" + randn.toFixed() + ".png\"" + "'>";
		
		for (var i = 0; i < targetData.length; i++) {
			try {
				var number = targetData[i].s,
					update = targetData[i].d,
					link = targetData[i].a,
					name = targetData[i].n;
			} catch (Exception) { }
			
			document.getElementById("caption").innerHTML 
			+= "<div class=item-cap onClick=\"window.open(\'" + link + "\',\'_blank\');\"><table><tr><td>" + Number(targetData[0].s.substring(0,4) + "." + targetData[0].s.substring(4,5)) + "È­"  + " - " + name + "</td></tr><tr><td>&nbsp" 
			+ update.substring(0,4) + "³â " + update.substring(4,6) + "¿ù " + update.substring(6,8) + "ÀÏ " + update.substring(8,10) + "½Ã " + update.substring(10,12) + "ºÐ "
			+ "</td></tr></table></div>";
		}
		document.getElementById("overlay").style.display = "block";
	}
}

function releaseCap() {
	document.getElementById("overlay").style.display = "none";
}

function toggleMenu() {
	if (document.getElementById("menu").style.display === "none") {
		document.getElementById("menu").style.display = "block";
	} else {
		document.getElementById("menu").style.display = "none";
	}
}

function search() {
	
}