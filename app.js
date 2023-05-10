import fetch from "node-fetch";
const apiUrl = "https://api.skilljar.com/v1";
const authHeader = "Basic c2stbGl2ZS04NTQ4MzIyNGY0MTUyMTZhMmQ2MDA5NmU3ZWUxYjJiZjExYmZjNmI4Og==";
const Certifications = [];

let email = 'nat@olivestreetdesign.com'
const getCourses = async () => {
    try {
        const userResponse = await fetch(`${apiUrl}/users?email=${email}`, {
            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json",
            },
        });
        const userData = await userResponse.json();
        console.log(userData);
        if (userData.results.length === 0) {
            console.log(`No user found with email ${email}`);
            return [];
        }
        const userId = userData.results[0].user.id;
        console.log(userId);
        const coursesResponse = await fetch(`${apiUrl}/users/${userId}/published-courses`, {
            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json",
            },
        });
        const coursesData = await coursesResponse.json();
        const completedCourses = coursesData.filter(course => course.course_progress.success_status === "PASSED");
        const completedCourseTitles = completedCourses.map(course => course.course.title);
        console.log(completedCourseTitles)
        return completedCourseTitles;
    } catch (error) {
        console.error(error);
    }
};


const getCertifications = async () => {
    try {
        const completedCourseTitles = await getCourses(email);
        const certList = Certifications.map(cert => {
            const isCompleted = completedCourseTitles.includes(cert);
            return {
                title: cert,
                isCompleted,
            };
        });
        return certList;
    } catch (error) {
        console.error(error);
    }
};


getCertifications();

var handler = {
    // these methods must be named init and clean

    init: function (options) {
        getCertifications().then(function () {
            for (i = 0; i < certifications.length; i++) {
                let li = document.createElement("li");
                li.classList.add("certification");
                li.innerHTML = '<img class="certification" src="https://irp.cdn-website.com/553b2781/dms3rep/multi/award.svg" /><span class="certification">' + certifications[i] + '</span>';
                certList.appendChild(li);
            }
        });
    },

    clean: function (options) {
        options.container.innerHTML = '';
    }
}

dmAPI.registerExternalWidget('certs', handler)