import { base64Decode } from "@/hooks/encoder";

const SaveButton = () => {
  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("github_access_token");

      const pathSegments = window.location.pathname.split("/");
      const encodedRepoName = pathSegments[pathSegments.length - 1];
      const repoName = base64Decode(encodedRepoName);

      console.log("Repo name", repoName);

      if (!accessToken || !repoName) {
        console.error("Access token or repository name is missing");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/saveChanges`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repoName, accessToken }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error || "Failed to execute Git commands.");
      }
    } catch (error) {
      console.error("Error saving repository:", error);
    }
  };

  return (
    <>
      <button className='bookmarkBtn' onClick={handleSave}>
        <span className='IconContainer'>
          <svg viewBox='0 0 384 512' height='0.9em' className='icon'>
            <path d='M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z' />
          </svg>
        </span>
        <p className='text'>Save</p>
      </button>
    </>
  );
};

export default SaveButton;
