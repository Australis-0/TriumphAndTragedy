module.exports = {
  splitCommandLine: function (commandLine) {
		var spaceMarker = '<SP>';

		while (commandLine.indexOf(spaceMarker) > -1) spaceMarker += '@';

		var noSpacesInQuotes = commandLine.replace(/"([^"]*)"?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker);
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/“([^"]*)“?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker);
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/“([^"]*)”?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker) ;
		});
		noSpacesInQuotes = noSpacesInQuotes.replace(/”([^"]*)“?/g, (fullMatch, capture) => {
			return capture.replace(/ /g, spaceMarker) ;
		});
		var mangledParamArray = noSpacesInQuotes.split(/ +/) ;
		var paramArray = mangledParamArray.map((mangledParam) => {
			return mangledParam.replace(RegExp(spaceMarker, 'g'), ' ') ;
		});

		return paramArray;
	}
};
