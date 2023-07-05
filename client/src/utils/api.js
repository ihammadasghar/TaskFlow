import axios from "axios";

const fetchGet = async (url) => {
    var config = {
        method: 'get',
        url,
        headers: { 'Content-Type': 'application/json' },
    };
    let data = null;
    await axios(config)
        .then((res) => data = res.data)
        .catch((err) => console.log(err));
    return data;
};

const fetchPost = async (url, inputData) => {
    var config = {
        method: 'post',
        url,
        headers: { 'Content-Type': 'application/json' },
        data: inputData
    };
    let data = null;
    await axios(config)
        .then((res) => data = res.data)
        .catch((err) => console.log(err));
    return data;
};

const formPost = async (url, inputData) => {
    await axios.post(url, inputData);
};

export { fetchGet, fetchPost, formPost }