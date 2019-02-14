import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router'

import { connect } from 'react-redux'

 class LedamotTable extends Component{

    handleSelect = (event, rowData) =>{
        console.log(event, rowData)
        this.props.push('/ledamoter/' + rowData.intressent_id)
    }

    render(){
        const { classes, data } = this.props
        return (
            <div style={{  width: '100%'}}>
                <MaterialTable
                    columns={[
                        { title: 'Picture', field: 'bild_url_80',
                            render: rowData =>{
                                return(
                                    <img style={{borderRadius:'100%', height:'45px'}} src={rowData.bild_url_80}></img>
                                )
                            }
                        },
                        { title: 'First Name', field: 'tilltalsnamn' },
                        { title: 'Last Name', field: 'efternamn' },
                        { title: 'Birth year', field:'fodd_ar'},
                        { title: 'Party', field: 'parti' },
                        { title: 'Region', field:'valkrets'},


                    ]}
                    data={data.list.person}
                    title="Ledamoter"
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

export default connect(null, { push })(LedamotTable)

