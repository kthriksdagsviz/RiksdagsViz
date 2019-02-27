import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router'
import './ledamottable.scss'
import { connect } from 'react-redux'

 class LedamotTable extends Component{

    handleSelect = (event, rowData) =>{
        this.props.push('/ledamoter/' + rowData.intressent_id)
    }

    render(){
        const { classes, data } = this.props
        return (
            <div style={{  width: '100%', height:'100%'}}>
                <MaterialTable
                    
                    columns={[
                        { title: 'Bild', field: 'bild_url_80',
                            render: rowData =>{
                                return(
                                    <img style={{borderRadius:'100%', height:'45px'}} src={rowData.bild_url_80}></img>
                                )
                            }
                        },
                        { title: 'Tilltalsnamn', field: 'tilltalsnamn' },
                        { title: 'Efternamn', field: 'efternamn' },
                        { title: 'Födelseår', field:'fodd_ar'},
                        { title: 'Parti', field: 'parti' },
                        { title: 'Valkrets', field:'valkrets'},


                    ]}
                    data={data.list.person}
                    title="Ledamöter"
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

