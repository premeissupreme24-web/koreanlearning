function playAudio(source, options = {}) {
  const audioUrl = typeof source === "object"
    ? (options.slow ? source.slowAudioUrl : source.audioUrl)
    : null;
  const fallbackText = typeof source === "object"
    ? (options.text || source.speakText || source.sound || source.ko || source.copyText || source.glyph || "")
    : source;

  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(() => speakWithSpeechSynthesis(fallbackText));
    return;
  }

  speakWithSpeechSynthesis(fallbackText);
}

function speak(textOrItem, options = {}) {
  playAudio(textOrItem, options);
}

function speakWithSpeechSynthesis(text) {
  if (!("speechSynthesis" in window)) {
    toast(appLanguage === "en" ? "This browser does not support speech playback." : "這個瀏覽器不支援語音播放。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.82;
  const voices = window.speechSynthesis.getVoices();
  const koVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("ko"));
  if (koVoice) utterance.voice = koVoice;
  window.speechSynthesis.speak(utterance);
}
