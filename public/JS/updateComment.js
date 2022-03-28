//*******************************************************************************/
console.log("js file read")
async function updateComment(event){
    console.log("update comment worked")
    event.preventDefault();
    const content = document.querySelector('#comment-content').value;
    let path = document.location.pathname;
    path = path.split('/');
    const response = await fetch(`/api/comment/${path[path.length-1]}`, {
        method: 'PUT',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        //document.location.replace('/comment');
        document.location.reload();
    } else {
        alert('Failed to update comment');
    }
}


// async function update(event){
//     event.preventDefault();
//     const title = document.querySelector('#post-title').value;
//     const content = document.querySelector('#post-content').value;
//     let path = document.location.pathname;
//     path = path.split('/');
//     const response = await fetch(`/api/post/${path[path.length-1]}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             content
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//     if (response.ok) {
//         document.location.replace('/comment');
//     } else {
//         alert('Failed to update post');
//     }
// }

async function deleteComment(event){
    event.preventDefault();
    let path = document.location.pathname;
    path = path.split('/');
    const response = await fetch(`/api/comment/${path[path.length-1]}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/comment');
    } else {
        alert('Failed to delete comment');
    }
}


document.querySelector('#update-comment').addEventListener('click', updateComment);

document.querySelector('#delete-comment').addEventListener('click', deleteComment);