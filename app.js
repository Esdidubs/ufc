/*
========================================================
-----             THINGS TO ADD             ------------
========================================================

- Show the fighter style when doing comparison and on the main stats page
- make it prettier
- add comments to js
- fill out rest of data

-add isTie to all the draws

*/

$(function() {
	buttons();
	fighterSetup();
	fightingStyleSetup();
	styleListSetup();
	fighterListSetup();

	$('#dataSubtitle').replaceWith(` 
        <h2 id="dataSubtitle">Data from ${Object.keys(
			fights
		)[0]} until ${Object.keys(fights)[Object.keys(fights).length - 1]}. (${Object.keys(fights).length} total events)</h2>
	`);

	$('#fighterStats').toggleClass('hidden');
	$('#fightingStyleStats').toggleClass('hidden');
});

let fighters = {};
let fightingStyles = {};
let fighterSort = 'total';
let styleSort = 'total';

function buttons() {
	$('body').on('click', '#fighters', function() {
		event.preventDefault();
		if ($('#fighterStats').hasClass('hidden')) {
			$('#fighterStats').removeClass('hidden');
		}
		$('#fightingStyleStats').addClass('hidden');
		$('#fighterComparison').addClass('hidden');
		$('#fightingStyleComparison').addClass('hidden');
	});
	$('body').on('click', '#fightingStyles', function() {
		event.preventDefault();

		if ($('#fightingStyleStats').hasClass('hidden')) {
			$('#fightingStyleStats').removeClass('hidden');
		}
		$('#fighterStats').addClass('hidden');
		$('#fighterComparison').addClass('hidden');
		$('#fightingStyleComparison').addClass('hidden');
	});
	$('body').on('click', '#fighterComparisonBtn', function() {
		event.preventDefault();
		compareFighters();
		$('#fighterStats').addClass('hidden');
		$('#fightingStyleStats').addClass('hidden');
		$('#fightingStyleComparison').addClass('hidden');

		$('#fightingStyle1').get(0).selectedIndex = 0;
		$('#fightingStyle2').get(0).selectedIndex = 0;
	});
	$('body').on('click', '#fightStyleComparisonBtn', function() {
		event.preventDefault();
		compareFightingStyles();
		$('#fighterStats').addClass('hidden');
		$('#fightingStyleStats').addClass('hidden');
		$('#fighterComparison').addClass('hidden');

		$('#fighter1').get(0).selectedIndex = 0;
		$('#fighter2').get(0).selectedIndex = 0;
	});
	$('body').on('click', '#fSortWins', function() {
		event.preventDefault();
		fighterSort = 'wins';
		sortFighters();
	});
	$('body').on('click', '#fSortLosses', function() {
		event.preventDefault();
		fighterSort = 'losses';
		sortFighters();
	});
	$('body').on('click', '#fSortTotal', function() {
		event.preventDefault();
		fighterSort = 'total';
		sortFighters();
	});
	$('body').on('click', '#fSortTies', function() {
		event.preventDefault();
		fighterSort = 'ties';
		sortFighters();
	});
	$('body').on('click', '#sSortWins', function() {
		event.preventDefault();
		styleSort = 'wins';
		sortFightingStyle();
	});
	$('body').on('click', '#sSortLosses', function() {
		event.preventDefault();
		styleSort = 'losses';
		sortFightingStyle();
	});
	$('body').on('click', '#sSortTotal', function() {
		event.preventDefault();
		styleSort = 'total';
		sortFightingStyle();
	});
	$('body').on('click', '#sSortTies', function() {
		event.preventDefault();
		styleSort = 'ties';
		sortFightingStyle();
	});
}

function fighterSetup() {
	for (let ufc in fights) {
		for (let fight in fights[ufc]) {
			if (!(fights[ufc][fight].isTie == true)) {
				if (fighters[fights[ufc][fight].winner] == undefined) {
					fighters[fights[ufc][fight].winner] = { name: fights[ufc][fight].winner, total: 1, wins: 1, losses: 0, ties: 0 };
				} else {
					fighters[fights[ufc][fight].winner].wins++;
					fighters[fights[ufc][fight].winner].total++;
				}

				if (fighters[fights[ufc][fight].loser] == undefined) {
					fighters[fights[ufc][fight].loser] = { name: fights[ufc][fight].loser, total: 1, wins: 0, losses: 1, ties: 0 };
				} else {
					fighters[fights[ufc][fight].loser].losses++;
					fighters[fights[ufc][fight].loser].total++;
				}
			} else {
				if (fighters[fights[ufc][fight].tie1] == undefined) {
					fighters[fights[ufc][fight].tie1] = { name: fights[ufc][fight].tie1, total: 1, wins: 0, losses: 0, ties: 1 };
				} else {
					fighters[fights[ufc][fight].tie1].ties++;
					fighters[fights[ufc][fight].tie1].total++;
				}

				if (fighters[fights[ufc][fight].tie2] == undefined) {
					fighters[fights[ufc][fight].tie2] = { name: fights[ufc][fight].tie2, total: 1, wins: 0, losses: 0, ties: 1 };
				} else {
					fighters[fights[ufc][fight].tie2].ties++;
					fighters[fights[ufc][fight].tie2].total++;
				}
			}
		}
	}
	sortFighters();
}

function sortFighters() {
	let fighterArr = Object.entries(fighters);

	for (let i = 1; i < Object.keys(fighterArr).length; i++) {
		for (var j = 0; j < i; j++) {
			if (fighterArr[j][1][fighterSort] < fighterArr[i][1][fighterSort]) {
				var x = fighterArr[j];
				fighterArr[j] = fighterArr[i];
				fighterArr[i] = x;
			}
		}
	}

	printFighters(fighterArr);
}

function printFighters(fighterArr) {
	let fighterList = ``;
	for (let person in fighterArr) {
		fighterList += `<p class="indFight">${fighterArr[person][1].name} - Total: ${fighterArr[person][1].total} - Wins: ${fighterArr[person][1].wins} - Losses: ${fighterArr[
			person
		][1].losses} - Ties: ${fighterArr[person][1].ties}</p>`;
	}

	$('#fighterStats').replaceWith(` 
        <div id="fighterStats">
			<h2>Fighter Records</h2>
			<button id="fSortTotal">Sort by Total Fights</button>
			<button id="fSortWins">Sort by Wins</button>
			<button id="fSortLosses">Sort by Losses</button>
			<button id="fSortTies">Sort by Ties</button>
            <div id="fList">${fighterList}</div>
        </div>
    `);
}

function fightingStyleSetup() {
	for (let ufc in fights) {
		for (let fight in fights[ufc]) {
			if (!(fights[ufc][fight].isTie == true)) {
				if (fightingStyles[fights[ufc][fight].winningStyle] == undefined) {
					fightingStyles[fights[ufc][fight].winningStyle] = { name: fights[ufc][fight].winningStyle, total: 1, wins: 1, losses: 0, ties: 0 };
				} else {
					fightingStyles[fights[ufc][fight].winningStyle].wins++;
					fightingStyles[fights[ufc][fight].winningStyle].total++;
				}

				if (fightingStyles[fights[ufc][fight].losingStyle] == undefined) {
					fightingStyles[fights[ufc][fight].losingStyle] = { name: fights[ufc][fight].losingStyle, total: 1, wins: 0, losses: 1, ties: 0 };
				} else {
					fightingStyles[fights[ufc][fight].losingStyle].losses++;
					fightingStyles[fights[ufc][fight].losingStyle].total++;
				}
			} else {
				if (fightingStyles[fights[ufc][fight].tieStyle1] == undefined) {
					fightingStyles[fights[ufc][fight].tieStyle1] = { name: fights[ufc][fight].tieStyle1, total: 1, wins: 0, losses: 0, ties: 1 };
				} else {
					fightingStyles[fights[ufc][fight].tieStyle1].ties++;
					fightingStyles[fights[ufc][fight].tieStyle1].total++;
				}

				if (fightingStyles[fights[ufc][fight].tieStyle2] == undefined) {
					fightingStyles[fights[ufc][fight].tieStyle2] = { name: fights[ufc][fight].tieStyle2, total: 1, wins: 0, losses: 0, ties: 1 };
				} else {
					fightingStyles[fights[ufc][fight].tieStyle2].ties++;
					fightingStyles[fights[ufc][fight].tieStyle2].total++;
				}
			}
		}
	}
	sortFightingStyle();
}

function sortFightingStyle() {
	let styleArr = Object.entries(fightingStyles);

	for (let i = 1; i < Object.keys(styleArr).length; i++) {
		for (var j = 0; j < i; j++) {
			if (styleArr[j][1][styleSort] < styleArr[i][1][styleSort]) {
				var x = styleArr[j];
				styleArr[j] = styleArr[i];
				styleArr[i] = x;
			}
		}
	}

	printFightingStyle(styleArr);
}

function printFightingStyle(styleArr) {
	let fightingStylesList = ``;

	for (let style in styleArr) {
		fightingStylesList += `<p class="indFight">${styleArr[style][1].name} - Wins: ${styleArr[style][1].wins} - Losses: ${styleArr[style][1].losses} - Ties: ${styleArr[
			style
		][1].ties}</p>`;
	}

	$('#fightingStyleStats').replaceWith(` 
        <div id="fightingStyleStats">
			<h2>Style Records</h2>
			<button id="sSortTotal">Sort by Total Fights</button>
			<button id="sSortWins">Sort by Wins</button>
			<button id="sSortLosses">Sort by Losses</button>
			<button id="sSortTies">Sort by Ties</button>
            <div id="sList">${fightingStylesList}</div>
        </div>
    `);
}

function compareFightingStyles() {
	let style1 = $('#fightingStyle1').val();
	let style2 = $('#fightingStyle2').val();
	let style1Wins = 0;
	let style2Wins = 0;
	let totalFights = 0;
	let styleTies = 0;

	if (style1 != null && style2 != null) {
		for (let ufc in fights) {
			for (let fight in fights[ufc]) {
				if (fights[ufc][fight].winningStyle == style1 && fights[ufc][fight].losingStyle == style2) {
					style1Wins++;
					totalFights++;
				} else if (fights[ufc][fight].winningStyle == style2 && fights[ufc][fight].losingStyle == style1) {
					style2Wins++;
					totalFights++;
				} else if (
					(fights[ufc][fight].tieStyle1 == style1 && fights[ufc][fight].tieStyle2 == style2) ||
					(fights[ufc][fight].tieStyle1 == style2 && fights[ufc][fight].tieStyle2 == style1)
				) {
					styleTies++;
					totalFights++;
				}
			}
		}
		let style1Total = `${fightingStyles[style1].wins} - ${fightingStyles[style1].losses} - ${fightingStyles[style1].ties}`;
		let style2Total = `${fightingStyles[style2].wins} - ${fightingStyles[style2].losses} - ${fightingStyles[style2].ties}`;
		$('#fightingStyleComparison').replaceWith(` 
		<div class="comparisonBox" id="fightingStyleComparison">
			<div class="compareHeadliner" >
				<h2>Fighting Style Comparison</h2>
				<h3>${style1} vs ${style2}</h3>
				<p>Total Fights Against Each Other: ${totalFights}</p>
			</div>
			<div class="compareBoxes">
				<div>
				<h4>${style1}</h4>
				<p>Total Record: ${style1Total}</p>
				<p>Record Against ${style2}: ${style1Wins} - ${style2Wins} - ${styleTies}</p>
				</div>
				<div>
				<h4>${style2}</h4>
				<p>Total Record: ${style2Total}</p>
				<p>Record Against ${style1}: ${style2Wins} - ${style1Wins} - ${styleTies}</p>
				</div>
			</div>
        </div>
    `);
	}
}

function compareFighters() {
	let fighter1 = $('#fighter1').val();
	let fighter2 = $('#fighter2').val();
	let fighter1Wins = 0;
	let fighter2Wins = 0;
	let totalFights = 0;
	let fighterTies = 0;

	if (fighter1 != null && fighter2 != null) {
		for (let ufc in fights) {
			for (let fight in fights[ufc]) {
				if (fights[ufc][fight].winner == fighter1 && fights[ufc][fight].loser == fighter2) {
					fighter1Wins++;
					totalFights++;
				} else if (fights[ufc][fight].winner == fighter2 && fights[ufc][fight].loser == fighter1) {
					fighter2Wins++;
					totalFights++;
				} else if (
					(fights[ufc][fight].tie1 == fighter1 && fights[ufc][fight].tie2 == fighter2) ||
					(fights[ufc][fight].tie1 == fighter2 && fights[ufc][fight].tie2 == fighter1)
				) {
					fighterTies++;
					totalFights++;
				}
			}
		}
		let fighter1Total = `${fighters[fighter1].wins} - ${fighters[fighter1].losses} - ${fighters[fighter1].ties}`;
		let fighter2Total = `${fighters[fighter2].wins} - ${fighters[fighter2].losses} - ${fighters[fighter2].ties}`;
		$('#fighterComparison').replaceWith(` 
        
		
		<div class="comparisonBox" id="fighterComparison">
			<div class="compareHeadliner">
				<h2>Fighter Comparison</h2>
				<h3>${fighter1} vs ${fighter2}</h3>
				<p>Total Fights Against Each Other: ${totalFights}</p>
			</div>
			<div class="compareBoxes">
				<div>
				<h4>${fighter1}</h4>
				<p>Total Record: ${fighter1Total}</p>
				<p>Record Against ${fighter2}: ${fighter1Wins} - ${fighter2Wins} - ${fighterTies}</p>
				</div>
				<div>
				<h4>${fighter2}</h4>
				<p>Total Record: ${fighter2Total}</p>
				<p>Record Against ${fighter1}: ${fighter2Wins} - ${fighter1Wins} - ${fighterTies}</p>
				</div>
			</div>
        </div>
    `);
	}
}

function fighterListSetup() {
	let listItems = '';

	for (var key in fighters) {
		listItems += `<option value="${key}">${fighters[key].name}</option>`;
	}

	$('#fighter1').replaceWith(` 
        <select name="fighter1" id="fighter1" class="">
            <option value="" disabled selected>Fighter 1</option>
            ${listItems}
        </select>`);
	$('#fighter2').replaceWith(` 
        <select name="fighter2" id="fighter2" class="">
            <option value="" disabled selected>Fighter 2</option>
            ${listItems}
        </select>`);
}

function styleListSetup() {
	let listItems = '';

	for (var key in fightingStyles) {
		listItems += `<option value="${key}">${fightingStyles[key].name}</option>`;
	}

	$('#fightingStyle1').replaceWith(` 
        <select name="fightingStyle1" id="fightingStyle1" class="">
            <option value="" disabled selected>Fighting Style 1</option>
            ${listItems}
        </select>`);
	$('#fightingStyle2').replaceWith(` 
        <select name="fightingStyle2" id="fightingStyle2" class="">
            <option value="" disabled selected>Fighting Style 2</option>
            ${listItems}
        </select>`);
}
