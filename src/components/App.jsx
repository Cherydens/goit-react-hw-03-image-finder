import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuerry: '',
  };

  handleFormSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuerry={this.state.searchQuerry} />
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
