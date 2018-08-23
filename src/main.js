import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

//fake data

const userData = [
    {name: 'itchy'},
    {name: 'scratchy'}
]

// Subcomponents


const Header = ({setUser, showUsers}) =>{
    let msg = 'Only Show Users with Things'

    if(showUsers == false){
        msg = 'Show all Users'
    }

    return (
        <div className = 'bar' onClick = {() => setUser()}>
            <a href = '#'>{msg}</a>
        </div>
    )
}

const Display = ({userData, showUsers}) => {
            
    if (showUsers == false){
        userData = userData.filter(user => user.userThings.length)
    }

    return(
        <div className = 'container'>
            {userData.map( user => {
                return (
                    <div key = {user.name} className = 'box'>
                        <h3>{user.name}</h3>
                        {user.userThings && user.userThings.length ? user.userThings.map(thing => {
                            return(
                                <div key = {thing.id}>
                                    <h4>{thing.thing.name}</h4>
                                </div>
                            )}
                        ): null}
                    </div>
                )}
            )}
        </div>
    )
}


//Main component

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            users: userData,
            allUsers: true
        }
        this.setUser = this.setUser.bind(this)
    }

    setUser(){
        this.setState({
            allUsers: !this.state.allUsers
        })
        console.log(this.state.allUsers)
        // window.location.hash = this.state.setUser? '': 'filtered'
    }



    async componentDidMount () {
        try{
            const res = await axios.get(`/api/users`)
            const users = res.data
            console.log(users)
            this.setState({users: users})


            // window.addEventListener('hashchange', function(){
            //     console.log(window.location.hash, () =>{
            //     this.setState({setUses})
            // }
            // })
        }
        catch(ex){console.log(ex)}
    }

    render(){

        return (
            <div>
                <h1>ACME Users and Things </h1>
                <Header 
                setUser = {this.setUser}
                showUsers = {this.state.allUsers}
                />
                < Display 
                userData = {this.state.users}
                showUsers = {this.state.allUsers}
                />
            </div>
        )
    }

}


ReactDOM.render(
    <Main />,
    document.getElementById('app')
)