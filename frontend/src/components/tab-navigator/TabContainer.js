import TabItem from './TabItem';

function TabContainer({children}){
    return(
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map(tab=><TabItem
                        key={tab.url}
                        title={tab.title}
                        url={tab.url}/>)
                }
            </div>
            {children}
        </div>
    )
}

const getTabs=()=>{
    return[
        {
            title:'Sign in',
            url:"/signin"
        },
        {
            title:'Log in',
            url:'/login'
        },
    ]
}

export default TabContainer;