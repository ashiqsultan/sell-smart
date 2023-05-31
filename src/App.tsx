import { listDocuments } from './api/api';
import { Databases, ID } from 'appwrite';
import { createAccount, login, getInfo, logout } from './api/account';
import { create, getAll } from './api/posts';
import { getByStateId } from './api/cities';
function App() {
  const onClick = async () => {
    console.log(await listDocuments());
  };
  const onClickCreateAccount = async () => {
    // const account = await createAccount('ashiq02@example.com', 'thisisapwd');
  };
  const onClickLogin = async () => {
    console.log(await login('ashiq02@example.com', 'thisisapwd'));
  };
  const onClickInfo = async () => {
    const accountInfo = await getInfo();
    console.log(accountInfo);
  };
  const onClicklogout = async () => {
    const res = await logout();
    console.log(res);
  };
  const onCreate = async () => {
    const res = await create('', '', 1, '', '', '');
    console.log(res);
  };

  return (
    <div>
      Sell Smart
      <div>
        <button onClick={onClick}>Test API</button>
      </div>
      <div>
        <button onClick={onClickLogin}>Login</button>
      </div>
      <div>
        <button onClick={onClickInfo}>Get Info</button>
      </div>
      <div>
        <button onClick={onClicklogout}>Logout</button>
      </div>
      <div>
        <button onClick={getAll}>List Posts</button>
      </div>
      <div>
        <button onClick={onCreate}>Create Posts</button>
      </div>
    </div>
  );
}

export default App;
