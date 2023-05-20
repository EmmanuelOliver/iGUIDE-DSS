import { useCounselingSessionsContext } from "../hooks/usecounselingsessionContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useauthenticateContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CounselingSessionDetails = ({ counselingsession }) => {
  const { dispatch } = useCounselingSessionsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "/api/counseling_session/" + counselingsession._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COUNSELINGSESSION", payload: json });
    }
  };

  const navigate = useNavigate();
  const navigateDecisionSupport = async () => {
    const response = await fetch(
      "/api/counseling_session/" + counselingsession._id,
      {
        method: "GET",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "GET_COUNSELINGSESSION", payload: json });
    }

    navigate("/decisionsupport/" + counselingsession._id, {
      state: {
        title: counselingsession.title,
        studentNo: counselingsession.studentNo,
      },
    });
  };

  return (
    <div className="counseling-session-details">
      <div>
        <h4>{counselingsession.title}</h4>
        <p>
          <strong>Student Number: </strong>
          {counselingsession.studentNo}{" "}
        </p>
        <p>
          <strong>Status: </strong>
          ongoing
        </p>
        <p>
          {formatDistanceToNow(new Date(counselingsession.createdAt), {
            addSuffix: true,
          })}
        </p>

        <Link
          to={{
            pathname: `/decisionsupport` + counselingsession.id,
            state: {
              title: counselingsession.title,
              studentNo: counselingsession.studentNo,
            },
          }}
        >
          <button className="viewsession" onClick={navigateDecisionSupport}>
            View Session
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CounselingSessionDetails;
