function openVideoPopup(video, allVideos) {
  console.log('openVideoPopup called with video:', video);
  
  const relatedVideos = getVideosWithSameMovieTitle(allVideos, video);
  
  const popup = document.createElement('div');
  popup.className = 'video-popup';

  const overlay = document.createElement('div');
  overlay.className = 'video-popup-overlay';
  overlay.onclick = closeVideoPopup;
  popup.appendChild(overlay);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'video-popup-wrapper';
  videoWrapper.style.overflowY = 'scroll';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const videoResponsive = document.createElement('div');
  videoResponsive.className = 'video-responsive';

  const videoElement = document.createElement('iframe');
  videoElement.className = 'video-popup-video';
  videoElement.src = video.href.replace('watch?v=', 'embed/') + '?autoplay=1';
  videoElement.frameBorder = 0;
  videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  videoElement.allowFullscreen = true;
  videoElement.id = 'main-video';

  function setVideoSize() {
    const aspectRatio = 9 / 16;
    videoElement.width = popupContent.clientWidth;
    videoElement.height = popupContent.clientWidth * aspectRatio;
  }  
  
  

  setVideoSize();

  videoElement.addEventListener('load', setVideoSize);
  window.addEventListener('resize', setVideoSize);

  videoElement.addEventListener('load', () => {
	relatedVideosContainer.style.width = `${videoElement.clientWidth}px`;
  });


  const videoTitle = document.createElement('h3');
  videoTitle.innerText = 'BREAKDOWNS';
  videoTitle.style.marginTop = '20px';
  videoTitle.style.color = '#E492F5';

  const breakdownList = document.createElement('ul');

  video.breakdownLinks.forEach(link => {
    const breakdownLinkItem = document.createElement('li');
    const breakdownLink = document.createElement('a');
    breakdownLink.href = link === 'WIP' ? "https://vfxfinder.com/add-video.html" : link;
    breakdownLink.target = '_blank';
    breakdownLink.textContent = link;
    breakdownLink.className = 'breakdown-link';
    breakdownLinkItem.appendChild(breakdownLink);
    breakdownList.appendChild(breakdownLinkItem);
  });
    
  
  if (video.breakdownLinks.length === 0) {
    videoTitle.style.display = 'none';
  }

  videoWrapper.appendChild(breakdownList);

  const movieTitleElement = document.createElement('h4');
  movieTitleElement.innerText = video.movieTitle;
  movieTitleElement.style.marginTop = '20px';
  movieTitleElement.style.color = '#E492F5';

  if (relatedVideos.length === 0) {
    movieTitleElement.style.display = 'none';
  }

	const relatedVideosContainer = document.createElement('div');
	relatedVideosContainer.className = 'video-container popup-video-container related-videos-container';
	relatedVideosContainer.style.display = 'flex';
	relatedVideosContainer.style.flexWrap = 'wrap';
	relatedVideosContainer.style.marginTop = '20px';

  relatedVideos.forEach((relatedVideo, index) => {
	console.log('Related video index:', index, relatedVideo);
	const relatedVideoWrapper = document.createElement('div');
  relatedVideoWrapper.className = 'related-video-wrapper';
	relatedVideoWrapper.style.width = 'calc(24% - 10px)';
	relatedVideoWrapper.style.marginRight = '10px';
	relatedVideoWrapper.style.marginBottom = '10px';

  
	if ((index + 1) % 4 === 0) {
		relatedVideoWrapper.style.marginRight = '0';
    }
	
    const relatedVideoThumbnail = document.createElement('img');
    relatedVideoThumbnail.src = relatedVideo.src;
    relatedVideoThumbnail.className = 'related-video-thumbnail';
	relatedVideoThumbnail.style = 'width: 100%; height: auto; cursor: pointer; border-radius: 10px;';
    relatedVideoThumbnail.onclick = () => {
      closeVideoPopup();
      openVideoPopup(relatedVideo, allVideos);
    };

    relatedVideoWrapper.appendChild(relatedVideoThumbnail);
	relatedVideosContainer.appendChild(relatedVideoWrapper);
  });
  
  relatedVideosContainer.style.display = 'flex';
  relatedVideosContainer.style.flexWrap = 'wrap';

  videoResponsive.appendChild(videoElement);
  popupContent.appendChild(videoResponsive);
  popupContent.appendChild(videoTitle);
  popupContent.appendChild(breakdownList);
  popupContent.appendChild(movieTitleElement);
  popupContent.appendChild(relatedVideosContainer);

  videoWrapper.appendChild(popupContent);
  popup.appendChild(videoWrapper);
  document.body.appendChild(popup);
}



function closeVideoPopup() {
  const popup = document.querySelector('.video-popup');
  if (popup) {
    document.body.removeChild(popup);
  }
}



function getVideosWithSameMovieTitle(videos, currentVideo) {
  return videos.filter(
    video => video.movieTitle === currentVideo.movieTitle && video.href !== currentVideo.href
  );
}