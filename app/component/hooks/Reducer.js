import differenceBy from 'lodash/differenceBy';

export const Reducer= (state=[],action) =>{
    console.log('ocurre')
    switch(action?.type){
        case'add':
            console.log(action.payload)
            return [...state, action.payload]

        case 'delete':
            console.log(differenceBy(state,action.payload,'id'))
            return differenceBy(state,action.payload,'id')

        case 'update': 
            return state.map( post => 
                ( post.id === action.payload.oldItem.id )
                    ? ({ ...post,
                    name:action.payload.newItem.name,
                    email:action.payload.newItem.email,
                    body:action.payload.newItem.body,
                    })
                    : post
            );
        default:
            return state
    }
}
