import React from 'react'
import ReactDom from 'react-dom'
import Layout from './layout'
import Navbar from './navbar'
import SubNavbar from './subnavbar'
import CardList from './card-list'
import './index.css'

const App = () => (
  <Layout>
    <Navbar />
    <SubNavbar />
    <CardList />
  </Layout>
)

ReactDom.render(<App />, document.getElementById('root'))
