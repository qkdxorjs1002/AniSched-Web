const anilistUrl= "https://www.anissia.net/anitime/list.js?w=";
const anicapUrl = "https://www.anissia.net/anitime/cap.js?i=";
const thumbUrl = "http://test.istpikworld.net/~anisched/";

var day = ['일', '월', '화', '수', '목', '금', '토', '외', '신'];
var targetId = "";

function init() {
	var today = new Date();
	var temp = '';
	document.getElementById("menu").style.display = "none";
	
	for (var i = 0; i < day.length; i++) {
		temp += "<td><div class=day onClick=\"httpGet(\'" + anilistUrl + "\'," + i + ");\">" + day[i] + "</div></td>";
	}
	document.getElementById("tab").innerHTML += "<table class=sel_day><tr>"+ temp +"</tr></table>";
	
	httpGet(anilistUrl, today.getDay());
}
function httpGet(targetUrl, id) {
	var script = document.createElement("script");
	
	script.type = "text/javascript";
	script.src = targetUrl + id;
	targetId = id;
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

function anitimeJson(data) {	
	listDrawer(data);
}

function listDrawer(targetData) {
	var randn = Math.random() * 40;

	if (targetData.length === 0) {
		document.getElementById("image").innerHTML 
			= "<img id='thumbnail' src='" + thumbUrl + targetId + ".jpg' onerror='this.src=\"" + thumbUrl + "rand" + randn.toFixed() + ".png\"" + "'>";
		
		document.getElementById("caption").innerHTML 
			= "<div class=item-cap><table><tr><td>목록 없음</td></tr></table></div>";
		
		document.getElementById("overlay").style.display = "block";
	} else if (targetData[0].n === undefined) {
		document.getElementById("list").innerHTML = null;
		
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
					style = "";
					
				if (able === false) {
					var style = "style=\"box-shadow:0 1px 5px rgba(255, 0, 0, 0.25), 0 1px 2px rgba(255, 0, 0, 0.2);\"";
				}
			} catch (Exception) { }
			
			document.getElementById("list").innerHTML 
			+= "<div id=" + id + " class=item " + style + "alink=" + link + " onClick=\"httpGet(\'" + anicapUrl + "\'," + id + ");\"><table><tr><td>" + title + "</td></tr><tr><td>&nbsp" 
			+ time.substring(0,2) + ":" + time.substring(2,4) + " - " + genre
			+ "</td></tr></table></div>";
		}
	} else {
		document.getElementById("caption").innerHTML = null;
		
		document.getElementById("image").innerHTML 
			= "<img id='thumbnail' src='" + thumbUrl + targetId + ".jpg' onerror='this.src=\"" + thumbUrl + "rand" + randn.toFixed() + ".png\"" + "'>";
		
		for (var i = 0; i < targetData.length; i++) {
			try {
				var number = targetData[i].s,
					update = targetData[i].d,
					link = targetData[i].a,
					name = targetData[i].n;
			} catch (Exception) { }
			
			document.getElementById("caption").innerHTML 
			+= "<div class=item-cap onClick=\"window.open(\'" + link + "\',\'_blank\');\"><table><tr><td>" + Number(targetData[0].s.substring(0,4) + "." + targetData[0].s.substring(4,5)) + "화"  + " - " + name + "</td></tr><tr><td>&nbsp" 
			+ update.substring(0,4) + "년 " + update.substring(4,6) + "월 " + update.substring(6,8) + "일 " + update.substring(8,10) + "시 " + update.substring(10,12) + "분 "
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