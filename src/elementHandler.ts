export default class MyElementHandler {
  element(element: any) {
    switch (element.tagName) {
      case 'title':
        element.setInnerContent('Bifrost');
        break;
      case 'h1':
        element.setInnerContent('Welcome to Asgard!');
        break;
      case 'p':
        element.setInnerContent(
          'Asgard is not a place. It never was. This could be Asgard. Asgard is where our people stand.'
        );
        break;
      case 'a':
        element.setInnerContent('Check out my website!');
        element.setAttribute('href', 'https://devnur.me');
        break;
    }
  }
}
