import React from 'react'
import ReactDom from 'react-dom'
import Layout from './layout'
import Navbar from './navbar'
import SubNavbar from './subnavbar'
import CardList from './card-list'
import Card from './card'
import './index.css'

const App = () => (
  <Layout>
    <Navbar />
    <SubNavbar />
    <CardList>
      <Card />
    </CardList>
  </Layout>
)

ReactDom.render(<App />, document.getElementById('root'))
