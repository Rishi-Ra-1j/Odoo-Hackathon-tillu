const Home = () => (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body">
            <h1 className="card-title mb-3 fw-bold">Welcome to StackIt!</h1>
            <p className="card-text">
              A minimal, fast Q&A platform for collaborative learning. <br />
              <strong>Roles:</strong> Guest (read-only), User (ask/answer/vote), Admin (moderate/ban).
            </p>
            <ul>
              <li>Rich-text Q&A posting</li>
              <li>Voting and accepted answers</li>
              <li>Real-time notifications</li>
              <li>Clean, responsive UI (Bootstrap 5)</li>
            </ul>
            <p className="mt-3 text-secondary">
              🚀 Start by registering or login as a user/admin!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Home;
