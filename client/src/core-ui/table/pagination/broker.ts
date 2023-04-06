interface Location {
  search: string;
  pathname: string;
}

export const addpageToRoute = (location: Location, page: string) => {
  let newPath = "";
  let pageAlreadyIn = false;
  if (location.search === "") {
    newPath += "?page=" + page;
  } else {
    newPath = "?";
    let _removeQuestionMark = location.search.substring(1);

    //split with '&'
    let splittedValues = _removeQuestionMark.split("&");

    for (let index = 0; index < splittedValues.length; index++) {
      const element = splittedValues[index];
      if (element.split("=")[0] === "page") {
        pageAlreadyIn = true;
        let substring = "page=" + page;
        newPath += index === 0 ? substring : "&" + substring;
      } else {
        newPath += index === 0 ? element : "&" + element;
      }
    }

    if (!pageAlreadyIn) {
      let substring = "page=" + page;
      newPath += splittedValues.length === 0 ? substring : "&" + substring;
    }
  }

  return location.pathname + newPath;
};
