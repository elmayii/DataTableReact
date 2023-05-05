import 'styled-components'
import React, {useState, useEffect} from "react";
import DataTable,{createTheme} from "react-data-table-component";
import { Paper, IconButton,Checkbox} from '@mui/material';
import differenceBy from 'lodash/differenceBy';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Formulario from './formulario';
import styles from './tabla.module.css'
import { Reducer } from './hooks/Reducer';
import { useReducer } from 'react';
import { useAxios } from './hooks/useAxios';
const URL='https://jsonplaceholder.typicode.com/posts/1/comments'

const sortIcon = <ArrowDownwardOutlinedIcon />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
const actions = (CreatePost) => (
	<IconButton color="primary" onClick={CreatePost}>
		<AddIcon />
	</IconButton>
);
const contextActions = (handleClearRows,onUpdate) => (
    <div>
	<IconButton style={{padding: '3px'}} onClick={handleClearRows}>
		<DeleteIcon color='primary'/>
	</IconButton>
    <IconButton onClick={onUpdate}>
        <UpgradeIcon color='primary'/>
    </IconButton>
    </div>
);

const init = (rows) => {
    return JSON.parse(localStorage.getItem('post')) || rows;
}

function Tab ({rows}){
    console.log(rows)
    console.log(JSON.parse(localStorage.getItem('post')))

    //Configurar el hook
    const [post, dispatch] = useReducer(Reducer, rows,init);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)
    
        
        	const handleChange = ({selectedRows}) => {
        		setSelectedRows(selectedRows);
                console.log(selectedRows)
        	};

            const onUpdate = () =>{
                if(selectedRows.length==1){
                console.log(selectedRows)
                setUpdate(true)
                setShow(true)
                setToggleClearRows(!toggledClearRows);
                }
            }

            const CreatePost = () =>{
                setShow(true)
            }

            const handleClearRows = () => {
                console.log(selectedRows)
                if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.id)}?`)) {
                    setToggleClearRows(!toggledClearRows);
                    const action={
                        type:'delete',
                        payload: selectedRows
                    }
                    dispatch(action);
                }
            }

    useEffect(() =>{
        localStorage.setItem('post', JSON.stringify( post ) );
    }, [post])

    //definar tabla
    const columns = [
    {
        name: 'id',
        selector: row => row.id,
        sortable: true,
        left: true
    },
    {
        name: 'name',
        selector: row => row.name,
        left:true
    },
    {
        name: 'email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'body',
        selector: row => row.body,
        sortable: true
    },
    ];

    createTheme('solarized', {
        text: {  
          primary: '#49a09d',
          secondary: '#5f2c82',
        },
        background: {
          default: '#002b36',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

      const styless={
        rows: {
            style: {
                minHeight: '100px', // override the row height
            },
        },
        headCells: {
            style: {
                minHeight: '100px',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                
            },
        },
        cells: {
            style: {
                minHeight: '100px',
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
      }

    //render
    return(
        <>
    <div className={styles.table}>
    <Paper style={{ height: '100%' }}>
        <DataTable
            columns={columns}
            data={post}
            pagination
            paginationPerPage={3}
            theme='solarized'
            customStyles={styless}
            selectableRows
            highlightOnHover
            defaultSortField="id"
            actions={actions(CreatePost)}
            contextActions={contextActions(handleClearRows,onUpdate)}
            sortIcon={sortIcon}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
        />
    </Paper>
    </div>
    {show && <Formulario list={post} dispach={dispatch} setShow={setShow} selectedRows={selectedRows} update={update} setUpdate={setUpdate}/>}
    </>
    )
}

export default Tab

//Porque la peticion ocurre dos veces si estoy usando await, por esa razon es que filtro el arreglo data para eliminar duplicados