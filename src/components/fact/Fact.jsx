import React, {PureComponent} from 'react';
import styles from './fact.module.css';

class Fact extends PureComponent {

    render(){
        return (
            <div className={styles.fact}>
                {this.props.fact}
                <button className={styles.button} onClick={() => {this.props.deleteFact(this.props.fact)}} >Delete</button>      
            </div>  
        )
                 
    }
}

export default Fact
