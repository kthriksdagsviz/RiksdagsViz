import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router'

import { connect } from 'react-redux'
import { getVoteringarByParams } from '../../services/votering_services';

 class LedamotVoteringTable extends Component{

    handleSelect = (event, rowData) =>{
        this.props.push('/voteringar/' + rowData.votering_id)
    }

    render(){
        const { classes, data, voteringar } = this.props
        return (
            <div style={{  width: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                <MaterialTable
                    columns={[
                        
                        { title: 'Period', field: 'rm' },
                        { title: 'Voteringsid', field: 'votering_id' },
                        { title: 'Avser', field:'avser'},
                        { title: 'Röst', field: 'rost' },


                    ]}
                    data={voteringar.voteringlista.votering}
                    title="Senaste voteringar"
                    options={{
                        paging: true,
                        pageSize: 10,
                        searchable: true
                      }}
                    onRowClick={this.handleSelect}
                    
                    
                />
            </div>
        )
    }
}

export default connect(null, { push })(LedamotVoteringTable)

